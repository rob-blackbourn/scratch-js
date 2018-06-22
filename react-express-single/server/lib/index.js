'use strict';

let mainAsync = (() => {
  var _ref = _asyncToGenerator(function* (httpPort, mongoUrl, loggerFormat) {
    const app = (0, _express2.default)();

    app.locals.connection = yield _mongodb.MongoClient.connect(mongoUrl);
    app.locals.users = app.locals.connection.db('example3').collection('users');
    app.locals.foods = app.locals.connection.db('example2').collection('foods');

    (0, _passport4.default)(app.locals.users, _passport2.default);

    app.use((0, _morgan2.default)(loggerFormat));
    app.use(_express2.default.json());
    app.use(_express2.default.urlencoded({ extended: false }));

    app.get('/api/test', function (req, res) {
      return res.send('Hello World!');
    });
    app.use('/api/auth', _auth2.default);
    app.use('/api/food', (0, _food2.default)(_passport2.default));

    const clientFolder = _path2.default.resolve(_path2.default.join(__dirname, '..', '..', 'client', 'build'));
    app.use(_express2.default.static(_path2.default.resolve(clientFolder)));
    app.get('/*', function (req, res) {
      res.sendFile(_path2.default.join(clientFolder, 'index.html'));
    });

    app.listen(httpPort, function () {
      return console.log('Example app listening on port ' + httpPort);
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

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passport3 = require('./config/passport');

var _passport4 = _interopRequireDefault(_passport3);

var _mongodb = require('mongodb');

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _food = require('./routes/food');

var _food2 = _interopRequireDefault(_food);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJodHRwUG9ydCIsIm1vbmdvVXJsIiwibG9nZ2VyRm9ybWF0IiwiYXBwIiwibG9jYWxzIiwiY29ubmVjdGlvbiIsIk1vbmdvQ2xpZW50IiwiY29ubmVjdCIsInVzZXJzIiwiZGIiLCJjb2xsZWN0aW9uIiwiZm9vZHMiLCJwYXNzcG9ydCIsInVzZSIsImV4cHJlc3MiLCJqc29uIiwidXJsZW5jb2RlZCIsImV4dGVuZGVkIiwiZ2V0IiwicmVxIiwicmVzIiwic2VuZCIsImF1dGgiLCJjbGllbnRGb2xkZXIiLCJwYXRoIiwicmVzb2x2ZSIsImpvaW4iLCJfX2Rpcm5hbWUiLCJzdGF0aWMiLCJzZW5kRmlsZSIsImxpc3RlbiIsImNvbnNvbGUiLCJsb2ciLCJtYWluQXN5bmMiLCJtYWluIiwidGhlbiIsInBvcnQiLCJjYXRjaCIsImVycm9yIl0sIm1hcHBpbmdzIjoiOzs7K0JBVUEsV0FBMEJBLFFBQTFCLEVBQW9DQyxRQUFwQyxFQUE4Q0MsWUFBOUMsRUFBNEQ7QUFDMUQsVUFBTUMsTUFBTSx3QkFBWjs7QUFFQUEsUUFBSUMsTUFBSixDQUFXQyxVQUFYLEdBQXdCLE1BQU1DLHFCQUFZQyxPQUFaLENBQW9CTixRQUFwQixDQUE5QjtBQUNBRSxRQUFJQyxNQUFKLENBQVdJLEtBQVgsR0FBbUJMLElBQUlDLE1BQUosQ0FBV0MsVUFBWCxDQUFzQkksRUFBdEIsQ0FBeUIsVUFBekIsRUFBcUNDLFVBQXJDLENBQWdELE9BQWhELENBQW5CO0FBQ0FQLFFBQUlDLE1BQUosQ0FBV08sS0FBWCxHQUFtQlIsSUFBSUMsTUFBSixDQUFXQyxVQUFYLENBQXNCSSxFQUF0QixDQUF5QixVQUF6QixFQUFxQ0MsVUFBckMsQ0FBZ0QsT0FBaEQsQ0FBbkI7O0FBRUEsNEJBQWVQLElBQUlDLE1BQUosQ0FBV0ksS0FBMUIsRUFBaUNJLGtCQUFqQzs7QUFFQVQsUUFBSVUsR0FBSixDQUFRLHNCQUFPWCxZQUFQLENBQVI7QUFDQUMsUUFBSVUsR0FBSixDQUFRQyxrQkFBUUMsSUFBUixFQUFSO0FBQ0FaLFFBQUlVLEdBQUosQ0FBUUMsa0JBQVFFLFVBQVIsQ0FBbUIsRUFBRUMsVUFBVSxLQUFaLEVBQW5CLENBQVI7O0FBRUFkLFFBQUllLEdBQUosQ0FBUSxXQUFSLEVBQXFCLFVBQUNDLEdBQUQsRUFBTUMsR0FBTjtBQUFBLGFBQWNBLElBQUlDLElBQUosQ0FBUyxjQUFULENBQWQ7QUFBQSxLQUFyQjtBQUNBbEIsUUFBSVUsR0FBSixDQUFRLFdBQVIsRUFBcUJTLGNBQXJCO0FBQ0FuQixRQUFJVSxHQUFKLENBQVEsV0FBUixFQUFxQixvQkFBS0Qsa0JBQUwsQ0FBckI7O0FBRUEsVUFBTVcsZUFBZUMsZUFBS0MsT0FBTCxDQUFhRCxlQUFLRSxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsSUFBM0IsRUFBaUMsUUFBakMsRUFBMkMsT0FBM0MsQ0FBYixDQUFyQjtBQUNBeEIsUUFBSVUsR0FBSixDQUFRQyxrQkFBUWMsTUFBUixDQUFlSixlQUFLQyxPQUFMLENBQWFGLFlBQWIsQ0FBZixDQUFSO0FBQ0FwQixRQUFJZSxHQUFKLENBQVEsSUFBUixFQUFjLFVBQVVDLEdBQVYsRUFBZUMsR0FBZixFQUFvQjtBQUNoQ0EsVUFBSVMsUUFBSixDQUFhTCxlQUFLRSxJQUFMLENBQVVILFlBQVYsRUFBd0IsWUFBeEIsQ0FBYjtBQUNELEtBRkQ7O0FBSUFwQixRQUFJMkIsTUFBSixDQUFXOUIsUUFBWCxFQUFxQjtBQUFBLGFBQU0rQixRQUFRQyxHQUFSLENBQVksbUNBQW1DaEMsUUFBL0MsQ0FBTjtBQUFBLEtBQXJCOztBQUVBLFdBQU9BLFFBQVA7QUFDRCxHOztrQkExQmNpQyxTOzs7OztBQVZmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7OztBQThCQSxTQUFTQyxJQUFULENBQWVsQyxRQUFmLEVBQXlCQyxRQUF6QixFQUFtQ0MsWUFBbkMsRUFBaUQ7QUFDL0MrQixZQUFVakMsUUFBVixFQUFvQkMsUUFBcEIsRUFBOEJDLFlBQTlCLEVBQ0dpQyxJQURILENBQ1NDLElBQUQsSUFBVTtBQUNkTCxZQUFRQyxHQUFSLENBQVksNEJBQTRCSSxJQUF4QztBQUNELEdBSEgsRUFJR0MsS0FKSCxDQUlTQyxTQUFTO0FBQ2RQLFlBQVFDLEdBQVIsQ0FBWSxpQkFBWixFQUErQk0sS0FBL0I7QUFDRCxHQU5IO0FBT0Q7O0FBRURKLEtBQUssSUFBTCxFQUFXLG9DQUFYLEVBQWlELEtBQWpEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5pbXBvcnQgbG9nZ2VyIGZyb20gJ21vcmdhbidcbmltcG9ydCBwYXNzcG9ydCBmcm9tICdwYXNzcG9ydCdcbmltcG9ydCBwYXNzcG9ydENvbmZpZyBmcm9tICcuL2NvbmZpZy9wYXNzcG9ydCdcbmltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSAnbW9uZ29kYidcblxuaW1wb3J0IGF1dGggZnJvbSAnLi9yb3V0ZXMvYXV0aCdcbmltcG9ydCBmb29kIGZyb20gJy4vcm91dGVzL2Zvb2QnXG5cbmFzeW5jIGZ1bmN0aW9uIG1haW5Bc3luYyAoaHR0cFBvcnQsIG1vbmdvVXJsLCBsb2dnZXJGb3JtYXQpIHtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbiAgYXBwLmxvY2Fscy5jb25uZWN0aW9uID0gYXdhaXQgTW9uZ29DbGllbnQuY29ubmVjdChtb25nb1VybClcbiAgYXBwLmxvY2Fscy51c2VycyA9IGFwcC5sb2NhbHMuY29ubmVjdGlvbi5kYignZXhhbXBsZTMnKS5jb2xsZWN0aW9uKCd1c2VycycpXG4gIGFwcC5sb2NhbHMuZm9vZHMgPSBhcHAubG9jYWxzLmNvbm5lY3Rpb24uZGIoJ2V4YW1wbGUyJykuY29sbGVjdGlvbignZm9vZHMnKVxuXG4gIHBhc3Nwb3J0Q29uZmlnKGFwcC5sb2NhbHMudXNlcnMsIHBhc3Nwb3J0KVxuXG4gIGFwcC51c2UobG9nZ2VyKGxvZ2dlckZvcm1hdCkpXG4gIGFwcC51c2UoZXhwcmVzcy5qc29uKCkpXG4gIGFwcC51c2UoZXhwcmVzcy51cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IGZhbHNlIH0pKVxuXG4gIGFwcC5nZXQoJy9hcGkvdGVzdCcsIChyZXEsIHJlcykgPT4gcmVzLnNlbmQoJ0hlbGxvIFdvcmxkIScpKVxuICBhcHAudXNlKCcvYXBpL2F1dGgnLCBhdXRoKVxuICBhcHAudXNlKCcvYXBpL2Zvb2QnLCBmb29kKHBhc3Nwb3J0KSlcblxuICBjb25zdCBjbGllbnRGb2xkZXIgPSBwYXRoLnJlc29sdmUocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ2NsaWVudCcsICdidWlsZCcpKVxuICBhcHAudXNlKGV4cHJlc3Muc3RhdGljKHBhdGgucmVzb2x2ZShjbGllbnRGb2xkZXIpKSlcbiAgYXBwLmdldCgnLyonLCBmdW5jdGlvbiAocmVxLCByZXMpIHtcbiAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKGNsaWVudEZvbGRlciwgJ2luZGV4Lmh0bWwnKSlcbiAgfSlcblxuICBhcHAubGlzdGVuKGh0dHBQb3J0LCAoKSA9PiBjb25zb2xlLmxvZygnRXhhbXBsZSBhcHAgbGlzdGVuaW5nIG9uIHBvcnQgJyArIGh0dHBQb3J0KSlcblxuICByZXR1cm4gaHR0cFBvcnRcbn1cblxuZnVuY3Rpb24gbWFpbiAoaHR0cFBvcnQsIG1vbmdvVXJsLCBsb2dnZXJGb3JtYXQpIHtcbiAgbWFpbkFzeW5jKGh0dHBQb3J0LCBtb25nb1VybCwgbG9nZ2VyRm9ybWF0KVxuICAgIC50aGVuKChwb3J0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnU3RhcnRlZCBTZXJ2ZXIgb24gcG9ydCAnICsgcG9ydClcbiAgICB9KVxuICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIHN0YXJ0JywgZXJyb3IpXG4gICAgfSlcbn1cblxubWFpbigzMDAwLCAnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9leGFtcGxlMycsICdkZXYnKVxuIl19