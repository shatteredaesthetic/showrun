'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endofshow;

var _fs = require('fs');

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function endofshow(path) {
  return function (file) {
    let text = (0, _fs.readFileSync)(file, 'utf8'),
        log = (0, _log2.default)(text);
    (0, _fs.writeFile)(file, log);
    (0, _email2.default)(path, log);
  };
}
//# sourceMappingURL=index.js.map