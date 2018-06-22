'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _settings = require('../config/settings');

var _settings2 = _interopRequireDefault(_settings);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var router = _express2.default.Router();

router.post('/register', (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: 'Please pass username and password.' });
      return;
    }

    try {
      // save the user
      const hash = yield _bcrypt2.default.hash(req.body.password, 10);

      const newUser = {
        username: req.body.username,
        password: hash
      };

      yield req.app.locals.users.insertOne(newUser);
      res.json({ success: true, msg: 'Successful created new user.' });
    } catch (error) {
      return res.json({ success: false, msg: 'Username already exists.' });
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})());

router.post('/login', (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    const user = yield req.app.locals.users.findOne({
      username: req.body.username
    });

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
      return;
    }

    const isMatch = yield _bcrypt2.default.compare(req.body.password, user.password);
    if (!isMatch) {
      res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
      return;
    }

    // if user is found and password is right create a token
    var token = _jsonwebtoken2.default.sign(user, _settings2.default.secret);

    // return the information including token as JSON
    res.json({ success: true, token: 'JWT ' + token });
  });

  return function (_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})());

exports.default = router;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXV0aC5qcyJdLCJuYW1lcyI6WyJyb3V0ZXIiLCJleHByZXNzIiwiUm91dGVyIiwicG9zdCIsInJlcSIsInJlcyIsIm5leHQiLCJib2R5IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImpzb24iLCJzdWNjZXNzIiwibXNnIiwiaGFzaCIsImJjcnlwdCIsIm5ld1VzZXIiLCJhcHAiLCJsb2NhbHMiLCJ1c2VycyIsImluc2VydE9uZSIsImVycm9yIiwidXNlciIsImZpbmRPbmUiLCJzdGF0dXMiLCJzZW5kIiwiaXNNYXRjaCIsImNvbXBhcmUiLCJ0b2tlbiIsImp3dCIsInNpZ24iLCJzZXR0aW5ncyIsInNlY3JldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0Msa0JBQVFDLE1BQVIsRUFBYjs7QUFFQUYsT0FBT0csSUFBUCxDQUFZLFdBQVo7QUFBQSwrQkFBeUIsV0FBT0MsR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxJQUFqQixFQUEwQjtBQUNqRCxRQUFJLENBQUNGLElBQUlHLElBQUosQ0FBU0MsUUFBVixJQUFzQixDQUFDSixJQUFJRyxJQUFKLENBQVNFLFFBQXBDLEVBQThDO0FBQzVDSixVQUFJSyxJQUFKLENBQVMsRUFBQ0MsU0FBUyxLQUFWLEVBQWlCQyxLQUFLLG9DQUF0QixFQUFUO0FBQ0E7QUFDRDs7QUFFRCxRQUFJO0FBQ0Y7QUFDQSxZQUFNQyxPQUFPLE1BQU1DLGlCQUFPRCxJQUFQLENBQVlULElBQUlHLElBQUosQ0FBU0UsUUFBckIsRUFBK0IsRUFBL0IsQ0FBbkI7O0FBRUEsWUFBTU0sVUFBVTtBQUNkUCxrQkFBVUosSUFBSUcsSUFBSixDQUFTQyxRQURMO0FBRWRDLGtCQUFVSTtBQUZJLE9BQWhCOztBQUtBLFlBQU1ULElBQUlZLEdBQUosQ0FBUUMsTUFBUixDQUFlQyxLQUFmLENBQXFCQyxTQUFyQixDQUErQkosT0FBL0IsQ0FBTjtBQUNBVixVQUFJSyxJQUFKLENBQVMsRUFBQ0MsU0FBUyxJQUFWLEVBQWdCQyxLQUFLLDhCQUFyQixFQUFUO0FBRUQsS0FaRCxDQVlFLE9BQU9RLEtBQVAsRUFBYztBQUNkLGFBQU9mLElBQUlLLElBQUosQ0FBUyxFQUFDQyxTQUFTLEtBQVYsRUFBaUJDLEtBQUssMEJBQXRCLEVBQVQsQ0FBUDtBQUNEO0FBQ0YsR0FyQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBdUJBWixPQUFPRyxJQUFQLENBQVksUUFBWjtBQUFBLGdDQUFzQixXQUFPQyxHQUFQLEVBQVlDLEdBQVosRUFBb0I7QUFDeEMsVUFBTWdCLE9BQU8sTUFBTWpCLElBQUlZLEdBQUosQ0FBUUMsTUFBUixDQUFlQyxLQUFmLENBQXFCSSxPQUFyQixDQUE2QjtBQUM5Q2QsZ0JBQVVKLElBQUlHLElBQUosQ0FBU0M7QUFEMkIsS0FBN0IsQ0FBbkI7O0FBSUEsUUFBSSxDQUFDYSxJQUFMLEVBQVc7QUFDVGhCLFVBQUlrQixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUIsRUFBQ2IsU0FBUyxLQUFWLEVBQWlCQyxLQUFLLHdDQUF0QixFQUFyQjtBQUNBO0FBQ0Q7O0FBRUQsVUFBTWEsVUFBVSxNQUFNWCxpQkFBT1ksT0FBUCxDQUFldEIsSUFBSUcsSUFBSixDQUFTRSxRQUF4QixFQUFrQ1ksS0FBS1osUUFBdkMsQ0FBdEI7QUFDQSxRQUFJLENBQUNnQixPQUFMLEVBQWM7QUFDWnBCLFVBQUlrQixNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUIsRUFBQ2IsU0FBUyxLQUFWLEVBQWlCQyxLQUFLLHdDQUF0QixFQUFyQjtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQSxRQUFJZSxRQUFRQyx1QkFBSUMsSUFBSixDQUFTUixJQUFULEVBQWVTLG1CQUFTQyxNQUF4QixDQUFaOztBQUVBO0FBQ0ExQixRQUFJSyxJQUFKLENBQVMsRUFBQ0MsU0FBUyxJQUFWLEVBQWdCZ0IsT0FBTyxTQUFTQSxLQUFoQyxFQUFUO0FBQ0QsR0FyQkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O2tCQXVCZTNCLE0iLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzZXR0aW5ncyBmcm9tICcuLi9jb25maWcvc2V0dGluZ3MnXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdCdcblxudmFyIHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKClcblxucm91dGVyLnBvc3QoJy9yZWdpc3RlcicsIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBpZiAoIXJlcS5ib2R5LnVzZXJuYW1lIHx8ICFyZXEuYm9keS5wYXNzd29yZCkge1xuICAgIHJlcy5qc29uKHtzdWNjZXNzOiBmYWxzZSwgbXNnOiAnUGxlYXNlIHBhc3MgdXNlcm5hbWUgYW5kIHBhc3N3b3JkLid9KVxuICAgIHJldHVyblxuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBzYXZlIHRoZSB1c2VyXG4gICAgY29uc3QgaGFzaCA9IGF3YWl0IGJjcnlwdC5oYXNoKHJlcS5ib2R5LnBhc3N3b3JkLCAxMClcblxuICAgIGNvbnN0IG5ld1VzZXIgPSB7XG4gICAgICB1c2VybmFtZTogcmVxLmJvZHkudXNlcm5hbWUsXG4gICAgICBwYXNzd29yZDogaGFzaFxuICAgIH1cblxuICAgIGF3YWl0IHJlcS5hcHAubG9jYWxzLnVzZXJzLmluc2VydE9uZShuZXdVc2VyKVxuICAgIHJlcy5qc29uKHtzdWNjZXNzOiB0cnVlLCBtc2c6ICdTdWNjZXNzZnVsIGNyZWF0ZWQgbmV3IHVzZXIuJ30pXG4gIFxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuanNvbih7c3VjY2VzczogZmFsc2UsIG1zZzogJ1VzZXJuYW1lIGFscmVhZHkgZXhpc3RzLid9KVxuICB9XG59KVxuXG5yb3V0ZXIucG9zdCgnL2xvZ2luJywgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHVzZXIgPSBhd2FpdCByZXEuYXBwLmxvY2Fscy51c2Vycy5maW5kT25lKHtcbiAgICB1c2VybmFtZTogcmVxLmJvZHkudXNlcm5hbWVcbiAgfSlcbiAgXG4gIGlmICghdXNlcikge1xuICAgIHJlcy5zdGF0dXMoNDAxKS5zZW5kKHtzdWNjZXNzOiBmYWxzZSwgbXNnOiAnQXV0aGVudGljYXRpb24gZmFpbGVkLiBVc2VyIG5vdCBmb3VuZC4nfSlcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGlzTWF0Y2ggPSBhd2FpdCBiY3J5cHQuY29tcGFyZShyZXEuYm9keS5wYXNzd29yZCwgdXNlci5wYXNzd29yZClcbiAgaWYgKCFpc01hdGNoKSB7XG4gICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoe3N1Y2Nlc3M6IGZhbHNlLCBtc2c6ICdBdXRoZW50aWNhdGlvbiBmYWlsZWQuIFdyb25nIHBhc3N3b3JkLid9KVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gaWYgdXNlciBpcyBmb3VuZCBhbmQgcGFzc3dvcmQgaXMgcmlnaHQgY3JlYXRlIGEgdG9rZW5cbiAgdmFyIHRva2VuID0gand0LnNpZ24odXNlciwgc2V0dGluZ3Muc2VjcmV0KVxuXG4gIC8vIHJldHVybiB0aGUgaW5mb3JtYXRpb24gaW5jbHVkaW5nIHRva2VuIGFzIEpTT05cbiAgcmVzLmpzb24oe3N1Y2Nlc3M6IHRydWUsIHRva2VuOiAnSldUICcgKyB0b2tlbn0pXG59KVxuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXJcbiJdfQ==