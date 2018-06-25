import passport from 'passport'
import express from 'express'
import { create, read } from '../controllers/books'

const router = express.Router()

router
  .get('/', passport.authenticate('jwt', { session: false }), read)
  .post('/', passport.authenticate('jwt', { session: false }), create)

export default router
