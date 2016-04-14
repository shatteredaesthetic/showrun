'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _duration = require('./duration');

var _duration2 = _interopRequireDefault(_duration);

var _helpers = require('../../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stampStr(stamp) {
  var _stamp = _slicedToArray(stamp, 3);

  let time = _stamp[0];
  let label = _stamp[1];
  let _ = _stamp[2];

  return `${ time } - ${ label.replace(/_/g, ' ') }`;
}

const stampMap = _ramda2.default.compose(stampStr, _ramda2.default.split(' :: '));
const makeTimesLog = (0, _helpers.strXFstr)('\n', _ramda2.default.compose(_ramda2.default.map(stampMap), _ramda2.default.init));

const makeFullLog = log => `Times:\n${ makeTimesLog(log) }\n\nDurations:\n${ (0, _duration2.default)(log) }`;
exports.default = makeFullLog;
//# sourceMappingURL=log.js.map