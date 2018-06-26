import passport from 'passport'
import { jwtStrategyFactory, UserCache, UserService, BookService, roleCheckerFactory } from './services'
import UserStoreMock from './services/user-store.mock'
import BookStoreMock from './services/book-store.mock'
import { AuthenticationController, BookController } from './controllers'
import apiRouteFactory from './routes/api'

export default async function initAsync (databaseConfig, authenticationConfig) {

  const userService = new UserService(new UserStoreMock(), new UserCache(), authenticationConfig)
  const bookService = new BookService(new BookStoreMock())
  
  const jwtStrategy = jwtStrategyFactory(userService, authenticationConfig)
  passport.use(jwtStrategy)
  
  const controllers = {
    authenticationController: new AuthenticationController(userService, authenticationConfig),
    bookController: new BookController(bookService)
  }

  userService.create('admin@localhost', 'admin', [ {target: 'public', roles: ['read']}, {target: 'admin', roles: ['read', 'write', 'grant']} ])

  return apiRouteFactory(controllers, roleCheckerFactory(userService))
}
