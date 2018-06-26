import UserService from './user-service'
import UserCache from './user-cache'
import UserStoreMock from './user-store.mock'

describe('testing user service', () => {

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

  test('create, read, update, delete', async () => {

    const userStore = new UserStoreMock()
    const userCache = new UserCache()
  
    const email = 'foo@bar.com'
    const password = 'my password'
  
    const userService = new UserService(userStore, userCache, config)
  
    let user = await userService.create(email, password, config.defaultPermissions)
    expect(user._id).toBeDefined()
  
    user = await userService.read(user._id.toString())
    expect(user.email).toBe(email)
  
    expect(userService.comparePassword(password, user.password)).toBeTruthy()

    const otherPassword = 'my other password'
    await userService.update(user._id.toString(), { password: otherPassword })
    expect(userService.comparePassword(otherPassword, user.password)).toBeTruthy()
    
    await userService.delete(user._id.toString())
    user = await userService.read(user._id.toString())
    expect(user).toBeUndefined()
  })

  test('create and read by email', async () => {

    const userStore = new UserStoreMock()
    const userCache = new UserCache()
  
    const email = 'foo@bar.com'
    const password = 'my password'
  
    const userService = new UserService(userStore, userCache, config)
  
    const idFoo = await userService.create(email, password, config.defaultPermissions)
    expect(idFoo).toBeDefined()
  
    const user = await userService.readByEmail(email)
    expect(user.email).toBe(email)
    expect(userService.comparePassword(password, user.password)).toBeTruthy()
  })
  
})
