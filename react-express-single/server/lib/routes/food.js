'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = passport => {

  const router = (0, _express.Router)();

  function getToken(headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      }
    }

    return null;
  }

  router.get('/:id', passport.authenticate('jwt', { session: false }), (() => {
    var _ref = _asyncToGenerator(function* (req, res, next) {
      var token = getToken(req.headers);
      if (!token) {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
      }

      try {
        const id = req.params['id'];
        const food = yield req.app.locals.foods.findOne({ _id: id });
        res.json(food);
      } catch (error) {
        next(error);
      }
    });

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  })());

  router.get('/group/:group', (() => {
    var _ref2 = _asyncToGenerator(function* (req, res, next) {

      var token = getToken(req.headers);
      if (!token) {
        return res.status(403).send({ success: false, msg: 'Unauthorized.' });
      }

      try {
        const group = req.params['group'];
        const foodsInGroup = yield req.app.locals.foods.find({ group: group }).toArray();
        res.json(foodsInGroup);
      } catch (error) {
        next(error);
      }
    });

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  })());

  return router;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvZm9vZC5qcyJdLCJuYW1lcyI6WyJwYXNzcG9ydCIsInJvdXRlciIsImdldFRva2VuIiwiaGVhZGVycyIsImF1dGhvcml6YXRpb24iLCJwYXJ0ZWQiLCJzcGxpdCIsImxlbmd0aCIsImdldCIsImF1dGhlbnRpY2F0ZSIsInNlc3Npb24iLCJyZXEiLCJyZXMiLCJuZXh0IiwidG9rZW4iLCJzdGF0dXMiLCJzZW5kIiwic3VjY2VzcyIsIm1zZyIsImlkIiwicGFyYW1zIiwiZm9vZCIsImFwcCIsImxvY2FscyIsImZvb2RzIiwiZmluZE9uZSIsIl9pZCIsImpzb24iLCJlcnJvciIsImdyb3VwIiwiZm9vZHNJbkdyb3VwIiwiZmluZCIsInRvQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O2tCQUVlQSxZQUFZOztBQUV6QixRQUFNQyxTQUFTLHNCQUFmOztBQUVBLFdBQVNDLFFBQVQsQ0FBbUJDLE9BQW5CLEVBQTRCO0FBQzFCLFFBQUlBLFdBQVdBLFFBQVFDLGFBQXZCLEVBQXNDO0FBQ3BDLFVBQUlDLFNBQVNGLFFBQVFDLGFBQVIsQ0FBc0JFLEtBQXRCLENBQTRCLEdBQTVCLENBQWI7QUFDQSxVQUFJRCxPQUFPRSxNQUFQLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLGVBQU9GLE9BQU8sQ0FBUCxDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxXQUFPLElBQVA7QUFDRDs7QUFFREosU0FBT08sR0FBUCxDQUFXLE1BQVgsRUFBbUJSLFNBQVNTLFlBQVQsQ0FBc0IsS0FBdEIsRUFBNkIsRUFBRUMsU0FBUyxLQUFYLEVBQTdCLENBQW5CO0FBQUEsaUNBQXFFLFdBQU9DLEdBQVAsRUFBWUMsR0FBWixFQUFpQkMsSUFBakIsRUFBMEI7QUFDN0YsVUFBSUMsUUFBUVosU0FBU1MsSUFBSVIsT0FBYixDQUFaO0FBQ0EsVUFBSSxDQUFDVyxLQUFMLEVBQVk7QUFDVixlQUFPRixJQUFJRyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUIsRUFBQ0MsU0FBUyxLQUFWLEVBQWlCQyxLQUFLLGVBQXRCLEVBQXJCLENBQVA7QUFDRDs7QUFFRCxVQUFJO0FBQ0YsY0FBTUMsS0FBS1IsSUFBSVMsTUFBSixDQUFXLElBQVgsQ0FBWDtBQUNBLGNBQU1DLE9BQU8sTUFBTVYsSUFBSVcsR0FBSixDQUFRQyxNQUFSLENBQWVDLEtBQWYsQ0FBcUJDLE9BQXJCLENBQTZCLEVBQUNDLEtBQUtQLEVBQU4sRUFBN0IsQ0FBbkI7QUFDQVAsWUFBSWUsSUFBSixDQUFTTixJQUFUO0FBQ0QsT0FKRCxDQUlFLE9BQU9PLEtBQVAsRUFBYztBQUNkZixhQUFLZSxLQUFMO0FBQ0Q7QUFDRixLQWJEOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWVBM0IsU0FBT08sR0FBUCxDQUFXLGVBQVg7QUFBQSxrQ0FBNEIsV0FBT0csR0FBUCxFQUFZQyxHQUFaLEVBQWlCQyxJQUFqQixFQUEwQjs7QUFFcEQsVUFBSUMsUUFBUVosU0FBU1MsSUFBSVIsT0FBYixDQUFaO0FBQ0EsVUFBSSxDQUFDVyxLQUFMLEVBQVk7QUFDVixlQUFPRixJQUFJRyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUIsRUFBQ0MsU0FBUyxLQUFWLEVBQWlCQyxLQUFLLGVBQXRCLEVBQXJCLENBQVA7QUFDRDs7QUFFRCxVQUFJO0FBQ0YsY0FBTVcsUUFBUWxCLElBQUlTLE1BQUosQ0FBVyxPQUFYLENBQWQ7QUFDQSxjQUFNVSxlQUFlLE1BQU1uQixJQUFJVyxHQUFKLENBQVFDLE1BQVIsQ0FBZUMsS0FBZixDQUFxQk8sSUFBckIsQ0FBMEIsRUFBQ0YsT0FBT0EsS0FBUixFQUExQixFQUEwQ0csT0FBMUMsRUFBM0I7QUFDQXBCLFlBQUllLElBQUosQ0FBU0csWUFBVDtBQUNELE9BSkQsQ0FJRSxPQUFPRixLQUFQLEVBQWM7QUFDZGYsYUFBS2UsS0FBTDtBQUNEO0FBQ0YsS0FkRDs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFnQkEsU0FBTzNCLE1BQVA7QUFDRCxDIiwiZmlsZSI6ImZvb2QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdleHByZXNzJ1xuXG5leHBvcnQgZGVmYXVsdCBwYXNzcG9ydCA9PiB7XG5cbiAgY29uc3Qgcm91dGVyID0gUm91dGVyKClcblxuICBmdW5jdGlvbiBnZXRUb2tlbiAoaGVhZGVycykge1xuICAgIGlmIChoZWFkZXJzICYmIGhlYWRlcnMuYXV0aG9yaXphdGlvbikge1xuICAgICAgdmFyIHBhcnRlZCA9IGhlYWRlcnMuYXV0aG9yaXphdGlvbi5zcGxpdCgnICcpXG4gICAgICBpZiAocGFydGVkLmxlbmd0aCA9PT0gMikge1xuICAgICAgICByZXR1cm4gcGFydGVkWzFdXG4gICAgICB9XG4gICAgfVxuICBcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIFxuICByb3V0ZXIuZ2V0KCcvOmlkJywgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdqd3QnLCB7IHNlc3Npb246IGZhbHNlIH0pLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB2YXIgdG9rZW4gPSBnZXRUb2tlbihyZXEuaGVhZGVycylcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDMpLnNlbmQoe3N1Y2Nlc3M6IGZhbHNlLCBtc2c6ICdVbmF1dGhvcml6ZWQuJ30pXG4gICAgfVxuICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgaWQgPSByZXEucGFyYW1zWydpZCddXG4gICAgICBjb25zdCBmb29kID0gYXdhaXQgcmVxLmFwcC5sb2NhbHMuZm9vZHMuZmluZE9uZSh7X2lkOiBpZH0pXG4gICAgICByZXMuanNvbihmb29kKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBuZXh0KGVycm9yKVxuICAgIH1cbiAgfSlcbiAgXG4gIHJvdXRlci5nZXQoJy9ncm91cC86Z3JvdXAnLCBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgXG4gICAgdmFyIHRva2VuID0gZ2V0VG9rZW4ocmVxLmhlYWRlcnMpXG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAzKS5zZW5kKHtzdWNjZXNzOiBmYWxzZSwgbXNnOiAnVW5hdXRob3JpemVkLid9KVxuICAgIH1cbiAgXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGdyb3VwID0gcmVxLnBhcmFtc1snZ3JvdXAnXVxuICAgICAgY29uc3QgZm9vZHNJbkdyb3VwID0gYXdhaXQgcmVxLmFwcC5sb2NhbHMuZm9vZHMuZmluZCh7Z3JvdXA6IGdyb3VwfSkudG9BcnJheSgpXG4gICAgICByZXMuanNvbihmb29kc0luR3JvdXApXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG5leHQoZXJyb3IpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiByb3V0ZXJcbn1cbiJdfQ==