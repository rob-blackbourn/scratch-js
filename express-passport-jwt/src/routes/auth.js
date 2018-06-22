import config from '../config/database'
import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/user'

const router = express.Router()

router.post(
  '/signup',
  async (req, res) => {
    if (!req.body.username || !req.body.password) {
      return res.json({success: false, msg: 'Please pass username and password.'})
    } 

    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      })
      await user.save()
      return res.json({success: true, msg: 'Successful created new user.'})
    } catch (error) {
      return res.json({success: false, msg: 'Username already exists.'})
    }
  }
)

router.post(
  '/signin',
  async (req, res, next) => {
    try {
      const user = await User.findOne({username: req.body.username})

      if (!user) {
        return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
      }

      const isMatch = await user.comparePassword(req.body.password)
      if (!isMatch) {
        return res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
      }

      // if user is found and password is right create a token
      var token = jwt.sign(user.id, config.secret)

      // return the information including token as JSON
      res.json({success: true, token: 'bearer ' + token})

    } catch (error) {
      next(error)
    }
  }
)

export default router
