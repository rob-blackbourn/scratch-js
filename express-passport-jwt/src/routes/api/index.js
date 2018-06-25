import express from 'express'
import authRouteFactory from './auth'
import bookRouteFactory from './book'

function apiRouteFactory ({ authenticationController, bookController }) {

  const router = express.Router()

  router.use('/auth', authRouteFactory(authenticationController))
  router.use('/book', bookRouteFactory(bookController))
  
  return router
}

export default apiRouteFactory
