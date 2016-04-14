#!/usr/bin/env node
'use strict';

var _vorpal = require('vorpal');

var _vorpal2 = _interopRequireDefault(_vorpal);

var _timestamp = require('./commands/timestamp');

var _timestamp2 = _interopRequireDefault(_timestamp);

var _endofshow = require('./commands/endofshow');

var _endofshow2 = _interopRequireDefault(_endofshow);

var _qsessions = require('./commands/qsessions');

var _qsessions2 = _interopRequireDefault(_qsessions);

var _qclean = require('./commands/qclean');

var _qclean2 = _interopRequireDefault(_qclean);

var _qarchive = require('./commands/qarchive');

var _qarchive2 = _interopRequireDefault(_qarchive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = process.argv.slice(2);
const timestampAction = (0, _timestamp2.default)(path);
const endofshowAction = (0, _endofshow2.default)(path);
const qsessionsAction = (0, _qsessions2.default)(path);
const qcleanAction = (0, _qclean2.default)(path);
const qarchiveAction = (0, _qarchive2.default)(path);

const cli = (0, _vorpal2.default)();
cli.command('timestamp <label>', 'Sets a timestamp').action((_ref, cb) => {
  let label = _ref.label;

  timestampAction(label);
  cb();
});

cli.command('endofshow <file>', 'Creates log file, emails it to SM').action((_ref2, cb) => {
  let file = _ref2.file;

  endofshowAction(file);
  setTimeout(() => cli.ui.cancel(), 3000);
});

cli.command('qsessions', 'Moves all but most recent session into folder specified by tag').option('-p, --pretech', 'Move to <1.0.0 folder').option('-a, --techone', 'Move to 1_Thur folder').option('-b, --techtwo', 'Move to 2_Fri folder').option('-c, --techthree', 'Move to 3_Sat-Sun folder').action((_ref3, cb) => {
  let options = _ref3.options;

  qsessionsAction(options);
  cb();
});
/*
cli
  .command('qclean', 'Removes unused video files')
  .option('-a --audio', 'Clean audio folder')
  .option('-v --video', 'Clean projections folder')
  .action(({ options }, cb) => {
    qcleanAction(options);
    cb();
  });

cli
  .command('qarchive', 'Cleans folders, Zips up everything to Archive')
  .option('-v --video', 'Determines whether or not there are projections')
  .option('-s --sessions', 'Delete all patches in Sessions')
  .action(({ options }, cb) => {
    qarchiveAction(options);
    cb();
  });
*/
cli.delimiter(cli.chalk.cyan('show >')).show();
//# sourceMappingURL=runshow.js.map