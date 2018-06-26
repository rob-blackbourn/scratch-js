import axios from 'axios'
import querystring from 'querystring'
import initAsync from './init.mock'
import serverAsync from './server'

describe('server test', () => {

  const config = {
    secret: 'test secret',
    expiresIn: '24h',
    issuer: 'http://www.example.com',
    saltOrRounds: 10,
    defaultPermissions: [
      {
        target: 'public',
        roles: [
          'read'
        ]
      }
    ]
  }

  it('should register', async () => {
    const server = await serverAsync(3000, {}, config, initAsync)

    const data = {
      email: 'john@example.com',
      password: 'mypassword'
    }

    const response = await axios.post('http://localhost:3000/api/auth/register', querystring.stringify(data))
    expect(response.status).toBe(200)
    expect(response.data.success).toBeTruthy()
    server.close()
  })

  it('should register two users, login, reqest', async () => {
    const server = await serverAsync(3000, {}, config, initAsync)

    const john = {
      email: 'john@example.com',
      password: 'mypassword'
    }

    const registerJohn = await axios.post('http://localhost:3000/api/auth/register', querystring.stringify(john))
    expect(registerJohn.status).toBe(200)
    expect(registerJohn.data.success).toBeTruthy()

    const mary = {
      email: 'mary@example.com',
      password: 'mypassword'
    }

    const registerMary = await axios.post('http://localhost:3000/api/auth/register', querystring.stringify(mary))
    expect(registerMary.status).toBe(200)
    expect(registerMary.data.success).toBeTruthy()

    const admin = {
      email: 'admin@localhost',
      password: 'admin'
    }

    console.log('login admin')
    const loginAdmin = await axios.post('http://localhost:3000/api/auth/login', querystring.stringify(admin))
    expect(loginAdmin.status).toBe(200)
    expect(loginAdmin.data.success).toBeTruthy()

    // Update john as a book writer
    console.log('updating user')
    const updateDate = {
      permissions: [{target: 'public', roles: ['read']}, {target: 'books', roles: ['read', 'write']}]
    }
    const updateOptions = {
      method: 'POST',
      headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': `Bearer ${loginAdmin.data.token}`
      },
      data: querystring.stringify(updateDate),
      url: 'http://localhost:3000/api/auth/update/' + john.email
    }
    const updatejohn = await axios(updateOptions)
    expect(updatejohn.status).toBe(200)
    expect(updatejohn.data.success).toBeTruthy()

    const book1Data = {
      isbn: 'XY123456789',
      title: 'A book',
      author: 'John Brown',
      publisher: 'Brown Books'
    }
    const createBook1Options = {
      method: 'POST',
      headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': `Bearer ${registerJohn.data.token}`
      },
      data: querystring.stringify(book1Data),
      url: 'http://localhost:3000/api/book'
    }
    console.log('create book')
    const createBook = await axios(createBook1Options)
    expect(createBook.status).toBe(200)
    expect(createBook.data.success).toBeTruthy()

    console.log('read book')
    const readBookResponse = await axios.get('http://localhost:3000/api/book', { headers: { 'authorization': `Bearer ${registerJohn.data.token}` } })
    expect(readBookResponse.status).toBe(200)
    expect(readBookResponse.data[0].title).toBe(book1Data.title)

    try {
      await axios.get('http://localhost:3000/api/book', { headers: { 'authorization': 'Bearer XXX.YYY.ZZZ' } })
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error.response.status).toBe(401)
    }

    server.close()
  })
})
