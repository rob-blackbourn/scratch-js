import express from 'express'
import authRouteFactory from './auth'
import bookRouteFactory from './book'

function apiRouteFactory ({ authenticationController, bookController }, roleChecker) {

  const router = express.Router()

  router.use('/auth', authRouteFactory(authenticationController, roleChecker))
  router.use('/book', bookRouteFactory(bookController, roleChecker))
  
  return router
}

export default apiRouteFactory
