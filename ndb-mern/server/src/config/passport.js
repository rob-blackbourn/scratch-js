import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import User from '../models/user'
import settings from '../config/settings'

export default passport => {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = settings.secret
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({id: jwtPayload.id}, (err, user) => {
      if (err) {
        return done(err, false)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
