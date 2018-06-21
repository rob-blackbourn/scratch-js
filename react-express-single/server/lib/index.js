'use strict';

let mainAsync = (() => {
  var _ref = _asyncToGenerator(function* (httpPort, mongoUrl, loggerFormat) {
    const app = (0, _express2.default)();

    app.locals.connection = yield _mongodb.MongoClient.connect(mongoUrl);

    app.use((0, _morgan2.default)(loggerFormat));
    app.use(_express2.default.json());
    app.use(_express2.default.urlencoded({ extended: false }));

    app.get('/api/test', function (req, res) {
      return res.send('Hello World!');
    });

    const clientFolder = _path2.default.resolve(_path2.default.join(__dirname, '..', '..', 'client', 'build'));
    app.use(_express2.default.static(_path2.default.resolve(clientFolder)));
    app.get('/*', function (req, res) {
      res.sendFile(_path2.default.join(clientFolder, 'index.html'));
    });

    app.listen(httpPort, function () {
      return console.log('Example app listening on port 3000!');
    });

    return httpPort;
  });

  return function mainAsync(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _mongodb = require('mongodb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function main(httpPort, mongoUrl, loggerFormat) {
  mainAsync(httpPort, mongoUrl, loggerFormat).then(port => {
    console.log('Started Server on port ' + port);
  }).catch(error => {
    console.log('Failed to start', error);
  });
}

main(3000, 'mongodb://localhost:27017/example3', 'dev');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJodHRwUG9ydCIsIm1vbmdvVXJsIiwibG9nZ2VyRm9ybWF0IiwiYXBwIiwibG9jYWxzIiwiY29ubmVjdGlvbiIsIk1vbmdvQ2xpZW50IiwiY29ubmVjdCIsInVzZSIsImV4cHJlc3MiLCJqc29uIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZCIsImNsaWVudEZvbGRlciIsInBhdGgiLCJyZXNvbHZlIiwiam9pbiIsIl9fZGlybmFtZSIsInN0YXRpYyIsInNlbmRGaWxlIiwibGlzdGVuIiwiY29uc29sZSIsImxvZyIsIm1haW5Bc3luYyIsIm1haW4iLCJ0aGVuIiwicG9ydCIsImNhdGNoIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7OzsrQkFLQSxXQUEwQkEsUUFBMUIsRUFBb0NDLFFBQXBDLEVBQThDQyxZQUE5QyxFQUE0RDtBQUMxRCxVQUFNQyxNQUFNLHdCQUFaOztBQUVBQSxRQUFJQyxNQUFKLENBQVdDLFVBQVgsR0FBd0IsTUFBTUMscUJBQVlDLE9BQVosQ0FBb0JOLFFBQXBCLENBQTlCOztBQUVBRSxRQUFJSyxHQUFKLENBQVEsc0JBQU9OLFlBQVAsQ0FBUjtBQUNBQyxRQUFJSyxHQUFKLENBQVFDLGtCQUFRQyxJQUFSLEVBQVI7QUFDQVAsUUFBSUssR0FBSixDQUFRQyxrQkFBUUUsVUFBUixDQUFtQixFQUFFQyxVQUFVLEtBQVosRUFBbkIsQ0FBUjs7QUFFQVQsUUFBSVUsR0FBSixDQUFRLFdBQVIsRUFBcUIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOO0FBQUEsYUFBY0EsSUFBSUMsSUFBSixDQUFTLGNBQVQsQ0FBZDtBQUFBLEtBQXJCOztBQUVBLFVBQU1DLGVBQWVDLGVBQUtDLE9BQUwsQ0FBYUQsZUFBS0UsSUFBTCxDQUFVQyxTQUFWLEVBQXFCLElBQXJCLEVBQTJCLElBQTNCLEVBQWlDLFFBQWpDLEVBQTJDLE9BQTNDLENBQWIsQ0FBckI7QUFDQWxCLFFBQUlLLEdBQUosQ0FBUUMsa0JBQVFhLE1BQVIsQ0FBZUosZUFBS0MsT0FBTCxDQUFhRixZQUFiLENBQWYsQ0FBUjtBQUNBZCxRQUFJVSxHQUFKLENBQVEsSUFBUixFQUFjLFVBQVVDLEdBQVYsRUFBZUMsR0FBZixFQUFvQjtBQUNoQ0EsVUFBSVEsUUFBSixDQUFhTCxlQUFLRSxJQUFMLENBQVVILFlBQVYsRUFBd0IsWUFBeEIsQ0FBYjtBQUNELEtBRkQ7O0FBSUFkLFFBQUlxQixNQUFKLENBQVd4QixRQUFYLEVBQXFCO0FBQUEsYUFBTXlCLFFBQVFDLEdBQVIsQ0FBWSxxQ0FBWixDQUFOO0FBQUEsS0FBckI7O0FBRUEsV0FBTzFCLFFBQVA7QUFDRCxHOztrQkFwQmMyQixTOzs7OztBQUxmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUF3QkEsU0FBU0MsSUFBVCxDQUFlNUIsUUFBZixFQUF5QkMsUUFBekIsRUFBbUNDLFlBQW5DLEVBQWlEO0FBQy9DeUIsWUFBVTNCLFFBQVYsRUFBb0JDLFFBQXBCLEVBQThCQyxZQUE5QixFQUNHMkIsSUFESCxDQUNTQyxJQUFELElBQVU7QUFDZEwsWUFBUUMsR0FBUixDQUFZLDRCQUE0QkksSUFBeEM7QUFDRCxHQUhILEVBSUdDLEtBSkgsQ0FJU0MsU0FBUztBQUNkUCxZQUFRQyxHQUFSLENBQVksaUJBQVosRUFBK0JNLEtBQS9CO0FBQ0QsR0FOSDtBQU9EOztBQUVESixLQUFLLElBQUwsRUFBVyxvQ0FBWCxFQUFpRCxLQUFqRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IGxvZ2dlciBmcm9tICdtb3JnYW4nXG5pbXBvcnQgeyBNb25nb0NsaWVudCB9IGZyb20gJ21vbmdvZGInXG5cbmFzeW5jIGZ1bmN0aW9uIG1haW5Bc3luYyAoaHR0cFBvcnQsIG1vbmdvVXJsLCBsb2dnZXJGb3JtYXQpIHtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbiAgYXBwLmxvY2Fscy5jb25uZWN0aW9uID0gYXdhaXQgTW9uZ29DbGllbnQuY29ubmVjdChtb25nb1VybClcblxuICBhcHAudXNlKGxvZ2dlcihsb2dnZXJGb3JtYXQpKVxuICBhcHAudXNlKGV4cHJlc3MuanNvbigpKVxuICBhcHAudXNlKGV4cHJlc3MudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSlcblxuICBhcHAuZ2V0KCcvYXBpL3Rlc3QnLCAocmVxLCByZXMpID0+IHJlcy5zZW5kKCdIZWxsbyBXb3JsZCEnKSlcblxuICBjb25zdCBjbGllbnRGb2xkZXIgPSBwYXRoLnJlc29sdmUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ2NsaWVudCcsICdidWlsZCcpKVxuICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShjbGllbnRGb2xkZXIpKSlcbiAgYXBwLmdldCgnLyonLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKGNsaWVudEZvbGRlciwgJ2luZGV4Lmh0bWwnKSlcbiAgfSlcblxuICBhcHAubGlzdGVuKGh0dHBQb3J0LCAoKSA9PiBjb25zb2xlLmxvZygnRXhhbXBsZSBhcHAgbGlzdGVuaW5nIG9uIHBvcnQgMzAwMCEnKSlcblxuICByZXR1cm4gaHR0cFBvcnRcbn1cblxuZnVuY3Rpb24gbWFpbiAoaHR0cFBvcnQsIG1vbmdvVXJsLCBsb2dnZXJGb3JtYXQpIHtcbiAgbWFpbkFzeW5jKGh0dHBQb3J0LCBtb25nb1VybCwgbG9nZ2VyRm9ybWF0KVxuICAgIC50aGVuKChwb3J0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnU3RhcnRlZCBTZXJ2ZXIgb24gcG9ydCAnICsgcG9ydClcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIHN0YXJ0JywgZXJyb3IpXG4gICAgfSlcbn1cblxubWFpbigzMDAwLCAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9leGFtcGxlMycsICdkZXYnKVxuIl19