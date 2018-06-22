import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import User from '../models/user'
import config from '../config'

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
}

async function verify (jwtPayload, done) {
  try {
    const user = await User.findOne({id: jwtPayload.id})
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

export default strategy
