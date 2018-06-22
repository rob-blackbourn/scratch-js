import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import jwtStrategy from './config/passport'
import config from './config/database'
import auth from './routes/auth'
import book from './routes/book'

mongoose.connect(config.database)
passport.use(jwtStrategy)

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

app.get('/', (req, res) => {
  res.send('Page under construction.')
})

app.use('/api/auth', auth)
app.use('/api/book', book)

app.listen(3000, () => console.log('Example app listening on port 3000.'))
