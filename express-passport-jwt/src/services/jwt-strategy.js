import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'

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

export default (userService, config) => {

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
  }
  
  async function verify (jwtPayload, done) {
    try {
      const user = await userService.read(jwtPayload.sub)
      if (user) {
        done(null, user, jwtPayload)
      } else {
        done(null, false)
      }
    } catch (error) {
      return done(error, false)
    }
  }
  
  return new JwtStrategy(opts, verify)
}
