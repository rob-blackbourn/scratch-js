import fs from 'fs'
import path from 'path'
import https from 'https'
import express from 'express'
import logger from 'morgan'
import { MongoClient } from 'mongodb'

async function mainAsync (httpPort, mongoUrl, loggerFormat) {
  const app = express()

  app.locals.connection = await MongoClient.connect(mongoUrl)

  app.use(logger(loggerFormat))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.get('/', (req, res) => res.send('Hello World!'))

  const serverRoot = path.resolve(path.join(__dirname, '..'))
  const privateKey = fs.readFileSync(path.join(serverRoot, 'file.pem'), 'ascii')
  const certificate = fs.readFileSync(path.join(serverRoot, 'file.crt'), 'ascii')
  const options = {
    key: privateKey,
    cert: certificate
  }

  https.createServer(options, app).listen(httpPort)
  // app.listen(httpPort, () => console.log('Example app listening on port 3000!'))

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

main(3001, 'mongodb://localhost:27017/example3', 'dev')
