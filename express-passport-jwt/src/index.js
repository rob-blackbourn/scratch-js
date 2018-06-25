import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import {MongoClient} from 'mongodb'
import passport from 'passport'
import jwtStrategyFactory from './passport/jwt-strategy'
import config from './config'
import { UserCache, UserRepository, BookRepository } from './services'
import { AuthenticationController, BookController } from './controllers'
import apiRouteFactory from './routes/api'

async function mainAsync (httpPort, databaseConfig, authenticationConfig) {

  const connection = await MongoClient.connect(databaseConfig.mongoUrl)
  const db = connection.db('node-auth')

  const userCache = new UserCache()
  const userRepository = new UserRepository(db, userCache)
  const bookRepository = new BookRepository(db)
  
  const jwtStrategy = jwtStrategyFactory(userRepository, authenticationConfig)
  passport.use(jwtStrategy)
  
  const app = express()
  
  const controllers = {
    authenticationController: new AuthenticationController(userRepository, authenticationConfig),
    bookController: new BookController(bookRepository)
  }
  const apiRoutes = apiRouteFactory(controllers)
  
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(passport.initialize())
  
  app.get('/', (req, res) => {
    res.send('Page under construction.')
  })
  
  app.use('/api', apiRoutes)
  
  app.listen(httpPort, () => console.log('Example app listening on port 3000.'))
}

mainAsync(3000, config.database, config.authentication)
  .then(() => console.log('Started ...'))
  .catch(error => console.log('Failed to start', error))
