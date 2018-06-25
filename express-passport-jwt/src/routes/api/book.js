import passport from 'passport'
import express from 'express'

export default (bookController) => {

  const router = express.Router()

  router
    .get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => bookController.read(req, res, next))
    .post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => bookController.create(req, res, next))

  return router
}
