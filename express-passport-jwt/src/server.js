import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import passport from 'passport'

export default async function serverAsync (httpPort, databaseConfig, authenticationConfig, initAsync) {

  const apiRoutes = await initAsync(databaseConfig, authenticationConfig)

  const app = express()
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(passport.initialize())
  
  app.get('/', (req, res) => {
    res.send('Page under construction.')
  })
  
  app.use('/api', apiRoutes)
  
  return app.listen(httpPort, () => console.log('Example app listening on port 3000.'))
}
