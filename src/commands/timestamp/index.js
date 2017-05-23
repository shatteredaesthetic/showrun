import { appendFile } from 'fs';
import R from 'ramda';

const d = new Date();

const formatDate = R.compose(
  R.join('-'),
  R.tail,
  R.split(' '),
  date => date.toDateString()
);

function getTimestamp() {
  let t = new Date();
  return [ t.toLocaleTimeString('en-US', {hour12: false}), t.getTime() ];
}

export default function timestamp(path) {
  return function(label) {
    let [time, ms] = getTimestamp(),
        str = `${time} :: ${label} :: ${ms}\n`;
    appendFile(`${path}/Times/Times-${formatDate(d)}.txt`, str);
  };
}
