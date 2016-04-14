'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKey = exports.isAFile = exports.dateStr = exports.strXFstr = exports.toInt = exports.mapN = exports.toStr = exports.capitalize = undefined;

var _fs = require('fs');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const capitalize = exports.capitalize = str => _ramda2.default.head(str).toUpperCase() + _ramda2.default.tail(str);
const toStr = exports.toStr = x => x.toString();
const mapN = exports.mapN = _ramda2.default.curry((f, a) => a.map(f));
const toInt = exports.toInt = str => parseInt(str, 10);
const strXFstr = exports.strXFstr = _ramda2.default.curry((sep, xf) => _ramda2.default.compose(_ramda2.default.join(sep), xf, _ramda2.default.split(sep)));
const dateStr = exports.dateStr = date => date.toDateString();
const isAFile = exports.isAFile = x => (0, _fs.lstatSync)(x).isFile();
const makeObjArr = obj => Object.keys(obj).map(key => [key, obj[key]]);
const getKey = exports.getKey = obj => {
  let arr = makeObjArr(obj).filter(_ref => {
    var _ref2 = _slicedToArray(_ref, 2);

    let k = _ref2[0];
    let v = _ref2[1];
    return v;
  }).map(_ref3 => {
    var _ref4 = _slicedToArray(_ref3, 2);

    let k = _ref4[0];
    let v = _ref4[1];
    return k;
  });
  return arr.length === 0 ? 'base' : arr[0];
};
//# sourceMappingURL=helpers.js.map