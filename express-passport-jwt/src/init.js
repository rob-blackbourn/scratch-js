import {MongoClient} from 'mongodb'
import passport from 'passport'
import { jwtStrategyFactory, UserCache, UserStore, UserService, BookStore, BookService, roleCheckerFactory } from './services'
import { AuthenticationController, BookController } from './controllers'
import apiRouteFactory from './routes/api'

export default async function initAsync (databaseConfig, authenticationConfig) {

  const connection = await MongoClient.connect(databaseConfig.mongoUrl)
  const db = connection.db('node-auth')

  const userService = new UserService(new UserStore(db), new UserCache(), authenticationConfig)
  const bookService = new BookService(new BookStore(db))
  
  const jwtStrategy = jwtStrategyFactory(userService, authenticationConfig)
  passport.use(jwtStrategy)
  
  const controllers = {
    authenticationController: new AuthenticationController(userService, authenticationConfig),
    bookController: new BookController(bookService)
  }

  return apiRouteFactory(controllers, roleCheckerFactory(userService))
}
