import express from 'express'
import logger from 'morgan'
import readline from 'readline'
import {MongoClient} from 'mongodb'
import foodRouter from './routes'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function mainAsync (httpPort, mongoUrl, loggerFormat) {
  const app = express()

  app.locals.connection = await MongoClient.connect(mongoUrl)

  app.use(logger(loggerFormat))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.get('/', (req, res) => res.send('Hello World!'))
  app.use('/food', foodRouter)
  
  const server = app.listen(httpPort, () => console.log('Example app listening on port 3000!'))

  return {app, server}
}

function main (httpPort, mongoUrl, loggerFormat) {
  mainAsync(httpPort, mongoUrl, loggerFormat)
    .then(({app, server}) => {
      rl.question('Press ENTER to quit', (_) => {
        console.log('Closing server')
        server.close(() => {
          app.locals.connection.close()
            .then(() => process.exit())
        })
      })
    })
    .catch(error => {
      console.log('Failed to start', error)
    })
}

main(3000, 'mongodb://localhost:27017/example2', 'dev')
