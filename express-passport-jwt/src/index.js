import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import jwtStrategyFactory from './passport/jwt-strategy'
import config from './config'
import { UserRepository, BookRepository } from './services'
import { AuthenticationController, BookController } from './controllers'
import apiRouteFactory from './routes/api'

mongoose.connect(config.database)
const userRepository = new UserRepository()
const bookRepository = new BookRepository()

const jwtStrategy = jwtStrategyFactory(userRepository)
passport.use(jwtStrategy)

const app = express()

const controllers = {
  authenticationController: new AuthenticationController(userRepository),
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

app.listen(3000, () => console.log('Example app listening on port 3000.'))
