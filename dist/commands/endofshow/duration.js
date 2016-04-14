'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _helpers = require('../../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function diffs(time, i, a) {
  if (i === 0) return time;
  return time - a[i - 1];
}

function leadingZero(num) {
  let n = num.toString();
  if (n.length === 2) return n;
  return `0${ n }`;
}

const seconds = ms => Math.floor(ms / 1000) % 60;
const minutes = ms => Math.floor(ms / (1000 * 60)) % 60;
const hours = ms => Math.floor(ms / (1000 * 60 * 60)) % 24;
const prefixTime = f => _ramda2.default.compose(leadingZero, f);
const sec = prefixTime(seconds);
const min = prefixTime(minutes);
const hr = prefixTime(hours);
const durationStr = ms => `${ hr(ms) }:${ min(ms) }:${ sec(ms) }`;

const getMS = _ramda2.default.compose(_ramda2.default.last, _ramda2.default.split(' :: '));
const msInts = _ramda2.default.compose(_helpers.toInt, getMS);

const durationXF = _ramda2.default.compose(_ramda2.default.map(time => `${ _ramda2.default.last(time) } -> ${ _ramda2.default.head(time) }`), _ramda2.default.zip(['Preshow', 'Curtain Speech', 'Act I', 'Interval I', 'Act II']), // 'Interval II', 'Act III']),
_ramda2.default.tail, _ramda2.default.map(durationStr), (0, _helpers.mapN)(diffs), _ramda2.default.map(msInts));

const makeDurationLog = (0, _helpers.strXFstr)('\n', durationXF);
exports.default = makeDurationLog;
//# sourceMappingURL=duration.js.map