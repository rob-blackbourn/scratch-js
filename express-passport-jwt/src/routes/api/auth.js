import express from 'express'

export default (authenticationController) => {
  const router = express.Router()

  router
    .post('/register', (req, res, next) => authenticationController.register(req, res, next))
    .post('/login', (req, res, next) => authenticationController.login(req, res, next))

  return router
}
