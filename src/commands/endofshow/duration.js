import R from 'ramda';
import { toInt, mapN, strXFstr } from '../../utils';

function diffs(time, i, a) {
  if (i === 0) return time;
  return time - a[i - 1];
}

function leadingZero(num) {
  let n = num.toString();
  if(n.length === 2) return n;
  return `0${n}`;
}

const seconds = ms => Math.floor(ms/1000) % 60;
const minutes = ms => Math.floor(ms/(1000*60)) % 60;
const hours = ms => Math.floor(ms/(1000*60*60)) % 24;
const prefixTime = f => R.compose(leadingZero, f);
const sec = prefixTime(seconds);
const min = prefixTime(minutes);
const hr = prefixTime(hours);
const durationStr = ms => `${hr(ms)}:${min(ms)}:${sec(ms)}`;

const getMS = R.compose(R.last, R.split(' :: '));
const msInts = R.compose(toInt, getMS);

const durationXF = R.compose(
  R.map(time => `${R.last(time)} -> ${R.head(time)}`),
  R.zip(['Preshow', 'Curtain Speech', 'Act I', 'Interval I', 'Act II']),// 'Interval II', 'Act III']),
  R.tail,
  R.map(durationStr),
  mapN(diffs),
  R.map(msInts)
);

const makeDurationLog = strXFstr('\n', durationXF);
export default makeDurationLog;
