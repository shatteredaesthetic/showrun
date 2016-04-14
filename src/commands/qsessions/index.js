import { lstatSync, readdirSync } from 'fs';
import { mv } from 'shelljs';
import { join } from 'path';
import R from 'ramda';
import { getKey, isAFile } from '../../utils';

const getMillis = file => lstatSync(file).mtime.getTime();
const moveFile = dir => file => mv(file, dir);

const sessionsObj = {
  pretech: '/<1.0.0',
  techone: '/tech/1_Thur',
  techtwo: '/tech/2_Fri',
  techthree: '/tech/3_Sat-Sun',
  base: ''
};

function sessionClean(path, f) {
  return R.compose(
    R.forEach(f),
    R.tail,
    R.sort((a,b) => getMillis(b) - getMillis(a)),
    R.filter(isAFile),
    R.filter(x => !x.includes('.DS_Store') && !x.includes('changelog')),
    R.map(file => join(`${path}`, 'Sessions', file))
  );
}

export default function qsessions(path) {
  return function(options) {
    let ext = sessionsObj[getKey(options)],
        fldr = join(`${path}`, 'Sessions', 'previousSessions', `${ext}`),
        move = moveFile(fldr),
        files = readdirSync(`${path}/Sessions/`),
        clean = file => move(file),
        cleanSessions = sessionClean(path, clean);
    cleanSessions(files);
  };
}
