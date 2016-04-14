#!/usr/bin/env node

import vorpal from 'vorpal';
import timestamp from './commands/timestamp';
import endofshow from './commands/endofshow';
import qsessions from './commands/qsessions';
import qclean from './commands/qclean';
import qarchive from './commands/qarchive';

const path = process.argv.slice(2);
const timestampAction = timestamp(path);
const endofshowAction = endofshow(path);
const qsessionsAction = qsessions(path);
const qcleanAction = qclean(path);
const qarchiveAction = qarchive(path);

const cli = vorpal();
cli
  .command('timestamp <label>', 'Sets a timestamp')
  .action(({label}, cb) => {
    timestampAction(label);
    cb();
  });

cli
  .command('endofshow <file>', 'Creates log file, emails it to SM')
  .action(({file}, cb) => {
    endofshowAction(file);
    setTimeout(() => cli.ui.cancel(), 3000);
  });

cli
  .command('qsessions', 'Moves all but most recent session into folder specified by tag')
  .option('-p, --pretech', 'Move to <1.0.0 folder')
  .option('-a, --techone', 'Move to 1_Thur folder')
  .option('-b, --techtwo', 'Move to 2_Fri folder')
  .option('-c, --techthree', 'Move to 3_Sat-Sun folder')
  .action(({ options }, cb) => {
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
cli
  .delimiter(cli.chalk.cyan('show >'))
  .show();
