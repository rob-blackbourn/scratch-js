import settings from '../config/settings'
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

var router = express.Router()

router.post('/register', async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'})
    return
  }

  try {
    // save the user
    const hash = await bcrypt.hash(req.body.password, 10)

    const newUser = {
      username: req.body.username,
      password: hash
    }

    await req.app.locals.users.insertOne(newUser)
    res.json({success: true, msg: 'Successful created new user.'})
  
  } catch (error) {
    return res.json({success: false, msg: 'Username already exists.'})
  }
})

router.post('/login', async (req, res) => {
  const user = await req.app.locals.users.findOne({
    username: req.body.username
  })
  
  if (!user) {
    res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
    return
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password)
  if (!isMatch) {
    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
    return
  }

  // if user is found and password is right create a token
  var token = jwt.sign(user, settings.secret)

  // return the information including token as JSON
  res.json({success: true, token: 'JWT ' + token})
})

export default router
