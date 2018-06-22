import path from 'path'
import express from 'express'
import logger from 'morgan'
import passport from 'passport'
import passportConfig from './config/passport'
import { MongoClient } from 'mongodb'

import auth from './routes/auth'
import food from './routes/food'

async function mainAsync (httpPort, mongoUrl, loggerFormat) {
  const app = express()

  app.locals.connection = await MongoClient.connect(mongoUrl)
  app.locals.users = app.locals.connection.db('example3').collection('users')
  app.locals.foods = app.locals.connection.db('example2').collection('foods')

  passportConfig(app.locals.users, passport)

  app.use(logger(loggerFormat))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.get('/api/test', (req, res) => res.send('Hello World!'))
  app.use('/api/auth', auth)
  app.use('/api/food', food(passport))

  const clientFolder = path.resolve(path.join(__dirname, '..', '..', 'client', 'build'))
  app.use(express.static(path.resolve(clientFolder)))
  app.get('/*', function (req, res) {
    res.sendFile(path.join(clientFolder, 'index.html'))
  })

  app.listen(httpPort, () => console.log('Example app listening on port ' + httpPort))

  return httpPort
}

function main (httpPort, mongoUrl, loggerFormat) {
  mainAsync(httpPort, mongoUrl, loggerFormat)
    .then((port) => {
      console.log('Started Server on port ' + port)
    })
    .catch(error => {
      console.log('Failed to start', error)
    })
}

main(3000, 'mongodb://localhost:27017/example3', 'dev')
