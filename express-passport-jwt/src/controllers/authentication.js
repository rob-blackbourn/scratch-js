import config from '../config'
import jwt from 'jsonwebtoken'
import { getUserByUsername, saveUser } from '../services/user-repository'

export async function register (req, res) {
  if (!req.body.username || !req.body.password) {
    return res.json({success: false, msg: 'Please pass username and password.'})
  } 

  try {
    await saveUser(req.body.username, req.body.password)
    return res.json({success: true, msg: 'Successful created new user.'})
  } catch (error) {
    return res.json({success: false, msg: 'Username already exists.'})
  }
}

export async function login (req, res, next) {
  try {
    const user = await getUserByUsername(req.body.username)
    if (!user) {
      return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
    }

    const isMatch = await user.comparePassword(req.body.password)
    if (!isMatch) {
      return res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
    }

    // if user is found and password is right create a token
    const payload = { sub: user.id, user: user.username }
    const options = { expiresIn: config.expiresIn, issuer: config.issuer }
    const token = jwt.sign(payload, config.secret, options)

    // return the information including token as JSON
    res.json({ success: true, token })

  } catch (error) {
    next(error)
  }
}
