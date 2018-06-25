import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import jwtStrategy from './passport/jwt-strategy'
import config from './config'
import UserRespository from './services/user-repository'
import BookRepository from './services/book-repository'
import AuthenticationController from './controllers/authentication'
import authenticationRouteFactory from './routes/auth'
import bookRouteFactory from './routes/book'
import BookController from './controllers/books';

mongoose.connect(config.database)
const userRepository = new UserRespository()
const bookRepository = new BookRepository()

passport.use(jwtStrategy)

const app = express()
const authenticationRoutes = authenticationRouteFactory(new AuthenticationController(userRepository))
const bookRoutes = bookRouteFactory(new BookController(bookRepository))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

app.get('/', (req, res) => {
  res.send('Page under construction.')
})

app.use('/api/auth', authenticationRoutes)
app.use('/api/book', bookRoutes)

app.listen(3000, () => console.log('Example app listening on port 3000.'))
