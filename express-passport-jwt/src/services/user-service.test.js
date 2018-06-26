import UserService from './user-service'
import UserCache from './user-cache'
import UserStoreMock from './user-store.mock'

test('Smoke test', async () => {
  const userStore = new UserStoreMock()
  const userCache = new UserCache()
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

  const userService = new UserService(userStore, userCache, config)

  const idFoo = await userService.create('foo@bar.com', 'my password', config.defaultPermissions)
  expect(idFoo).toBeDefined()

  const user = await userService.read(idFoo)
  expect(user.email).toBe('foo@bar.com')

  const userByEmail = await userService.readByEmail('foo@bar.com')
  expect(userByEmail.email).toBe('foo@bar.com')
})
