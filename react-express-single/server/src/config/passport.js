import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import settings from './settings'

export default (users, passport) => {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = settings.secret
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    users.findOne({_id: jwtPayload.id}, (err, user) => {
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
