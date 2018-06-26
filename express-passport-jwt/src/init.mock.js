import passport from 'passport'
import { jwtStrategyFactory, UserCache, UserService, BookService } from './services'
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

  return apiRouteFactory(controllers)
}
