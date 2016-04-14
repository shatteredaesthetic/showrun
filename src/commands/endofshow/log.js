import R from 'ramda';
import makeDurationLog from './duration';
import { strXFstr } from '../../utils';

function stampStr(stamp) {
  let [time, label, _] = stamp;
  return `${time} - ${label.replace(/_/g, ' ')}`;
}

const stampMap = R.compose(stampStr, R.split(' :: '));
const makeTimesLog = strXFstr('\n', R.compose(R.map(stampMap), R.init));

const makeFullLog = log => `Times:\n${makeTimesLog(log)}\n\nDurations:\n${makeDurationLog(log)}`;
export default makeFullLog;
