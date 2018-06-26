import config from './config'
import initAsync from './init'
import serverAsync from './server'

serverAsync(3000, config.database, config.authentication, initAsync)
  .then(() => console.log('Started ...'))
  .catch(error => console.log('Failed to start', error))
