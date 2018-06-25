import express from 'express'
import { register, login } from '../controllers/authentication'

const router = express.Router()

router
  .post('/register', register)
  .post('/login', login)

export default router
