'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = qsessions;

var _fs = require('fs');

var _shelljs = require('shelljs');

var _path = require('path');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _helpers = require('../../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMillis = file => (0, _fs.lstatSync)(file).mtime.getTime();
const moveFile = dir => file => (0, _shelljs.mv)(file, dir);

const sessionsObj = {
  pretech: '/<1.0.0',
  techone: '/tech/1_Thur',
  techtwo: '/tech/2_Fri',
  techthree: '/tech/3_Sat-Sun',
  base: ''
};

function sessionClean(path, f) {
  return _ramda2.default.compose(_ramda2.default.forEach(f), _ramda2.default.tail, _ramda2.default.sort((a, b) => getMillis(b) - getMillis(a)), _ramda2.default.filter(_helpers.isAFile), _ramda2.default.filter(x => !x.includes('.DS_Store') && !x.includes('changelog')), _ramda2.default.map(file => (0, _path.join)(`${ path }`, 'Sessions', file)));
}

function qsessions(path) {
  return function (options) {
    let ext = sessionsObj[(0, _helpers.getKey)(options)],
        fldr = (0, _path.join)(`${ path }`, 'Sessions', 'previousSessions', `${ ext }`),
        move = moveFile(fldr),
        files = (0, _fs.readdirSync)(`${ path }/Sessions/`),
        clean = file => move(file),
        cleanSessions = sessionClean(path, clean);
    cleanSessions(files);
  };
}
//# sourceMappingURL=index.js.map