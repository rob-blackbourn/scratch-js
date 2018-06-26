import request from 'supertest'
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
          'guest'
        ]
      }
    ]
  }

  it('should register', async () => {
    const server = await serverAsync(3000, {}, config, initAsync)
    console.log('server', server)
    request(server)
      .post('/register')
      .send('email=joe@example.com')
      .send('password=my password')
      .expect(200)
    server.close()
  })
})
