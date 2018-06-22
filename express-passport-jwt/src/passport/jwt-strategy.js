import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import config from '../config'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
}

async function verify (jwtPayload, done) {
  try {
    const user = await User.findOne({_id: jwtPayload.id})
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  } catch (error) {
    return done(error, false)
  }
}

const strategy = new JwtStrategy(opts, verify)

export function decodeAuthHeaderBearerToken (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2 && parted[0].toLowerCase() === 'bearer') {
      const decoded = jwt.decode(parted[1], { complete: true })
      return decoded
    } else {
      return null
    }
  } else {
    return null
  }
}

export default strategy
