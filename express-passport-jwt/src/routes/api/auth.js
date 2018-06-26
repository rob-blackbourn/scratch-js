import express from 'express'
import passport from 'passport'

export default (authenticationController, roleChecker) => {
  const router = express.Router()

  router
    .post(
      '/register',
      (req, res, next) => authenticationController.register(req, res, next))
    .post(
      '/login',
      (req, res, next) => authenticationController.login(req, res, next))
    .post(
      '/update/:email',
      passport.authenticate('jwt', { session: false }),
      roleChecker([{ target: 'admin', roles: ['read', 'write'] }]),
      (req, res, next) => authenticationController.update(req, res, next))

  return router
}
