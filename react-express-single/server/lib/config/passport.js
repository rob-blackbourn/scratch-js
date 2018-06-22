'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportJwt = require('passport-jwt');

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (users, passport) => {
  var opts = {};
  opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = _settings2.default.secret;
  passport.use(new _passportJwt.Strategy(opts, (jwtPayload, done) => {
    users.findOne({ _id: jwtPayload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWcvcGFzc3BvcnQuanMiXSwibmFtZXMiOlsidXNlcnMiLCJwYXNzcG9ydCIsIm9wdHMiLCJqd3RGcm9tUmVxdWVzdCIsIkV4dHJhY3RKd3QiLCJmcm9tQXV0aEhlYWRlckFzQmVhcmVyVG9rZW4iLCJzZWNyZXRPcktleSIsInNldHRpbmdzIiwic2VjcmV0IiwidXNlIiwiSnd0U3RyYXRlZ3kiLCJqd3RQYXlsb2FkIiwiZG9uZSIsImZpbmRPbmUiLCJfaWQiLCJpZCIsImVyciIsInVzZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUNBOzs7Ozs7a0JBRWUsQ0FBQ0EsS0FBRCxFQUFRQyxRQUFSLEtBQXFCO0FBQ2xDLE1BQUlDLE9BQU8sRUFBWDtBQUNBQSxPQUFLQyxjQUFMLEdBQXNCQyx3QkFBV0MsMkJBQVgsRUFBdEI7QUFDQUgsT0FBS0ksV0FBTCxHQUFtQkMsbUJBQVNDLE1BQTVCO0FBQ0FQLFdBQVNRLEdBQVQsQ0FBYSxJQUFJQyxxQkFBSixDQUFnQlIsSUFBaEIsRUFBc0IsQ0FBQ1MsVUFBRCxFQUFhQyxJQUFiLEtBQXNCO0FBQ3ZEWixVQUFNYSxPQUFOLENBQWMsRUFBQ0MsS0FBS0gsV0FBV0ksRUFBakIsRUFBZCxFQUFvQyxDQUFDQyxHQUFELEVBQU1DLElBQU4sS0FBZTtBQUNqRCxVQUFJRCxHQUFKLEVBQVM7QUFDUCxlQUFPSixLQUFLSSxHQUFMLEVBQVUsS0FBVixDQUFQO0FBQ0Q7QUFDRCxVQUFJQyxJQUFKLEVBQVU7QUFDUkwsYUFBSyxJQUFMLEVBQVdLLElBQVg7QUFDRCxPQUZELE1BRU87QUFDTEwsYUFBSyxJQUFMLEVBQVcsS0FBWDtBQUNEO0FBQ0YsS0FURDtBQVVELEdBWFksQ0FBYjtBQVlELEMiLCJmaWxlIjoicGFzc3BvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHJhdGVneSBhcyBKd3RTdHJhdGVneSwgRXh0cmFjdEp3dCB9IGZyb20gJ3Bhc3Nwb3J0LWp3dCdcbmltcG9ydCBzZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzJ1xuXG5leHBvcnQgZGVmYXVsdCAodXNlcnMsIHBhc3Nwb3J0KSA9PiB7XG4gIHZhciBvcHRzID0ge31cbiAgb3B0cy5qd3RGcm9tUmVxdWVzdCA9IEV4dHJhY3RKd3QuZnJvbUF1dGhIZWFkZXJBc0JlYXJlclRva2VuKClcbiAgb3B0cy5zZWNyZXRPcktleSA9IHNldHRpbmdzLnNlY3JldFxuICBwYXNzcG9ydC51c2UobmV3IEp3dFN0cmF0ZWd5KG9wdHMsIChqd3RQYXlsb2FkLCBkb25lKSA9PiB7XG4gICAgdXNlcnMuZmluZE9uZSh7X2lkOiBqd3RQYXlsb2FkLmlkfSwgKGVyciwgdXNlcikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gZG9uZShlcnIsIGZhbHNlKVxuICAgICAgfVxuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgZG9uZShudWxsLCB1c2VyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9uZShudWxsLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9KVxuICB9KSlcbn1cbiJdfQ==