import passport from 'passport'
import express from 'express'

export default (bookController, roleChecker) => {

  const router = express.Router()

  router
    .get('/', passport.authenticate('jwt', { session: false }), roleChecker([{target: 'public', roles: ['read']}]), (req, res, next) => bookController.read(req, res, next))
    .post('/', passport.authenticate('jwt', { session: false }), roleChecker([{target: 'books', roles: ['write']}]), (req, res, next) => bookController.create(req, res, next))

  return router
}
