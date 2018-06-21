import path from 'path'
import express from 'express'
import logger from 'morgan'
import { MongoClient } from 'mongodb'

async function mainAsync (httpPort, mongoUrl, loggerFormat) {
  const app = express()

  app.locals.connection = await MongoClient.connect(mongoUrl)

  app.use(logger(loggerFormat))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.get('/api/test', (req, res) => res.send('Hello World!'))

  const clientFolder = path.resolve(path.join(__dirname, '..', '..', 'client', 'build'))
  app.use(express.static(path.resolve(clientFolder)))
  app.get('/*', function (req, res) {
    res.sendFile(path.join(clientFolder, 'index.html'))
  })

  app.listen(httpPort, () => console.log('Example app listening on port 3000!'))

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
