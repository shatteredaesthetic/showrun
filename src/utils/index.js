import { lstatSync, readFileSync } from 'fs';
import R from 'ramda';

export const capitalize = str => R.head(str).toUpperCase() + R.tail(str);
export const toStr = x => x.toString();
export const mapN = R.curry((f, a) => a.map(f));
export const toInt = str => parseInt(str, 10);
export const strXFstr = R.curry((sep, xf) => R.compose(R.join(sep), xf, R.split(sep)));
export const dateStr = date => date.toDateString();
export const isAFile = x => lstatSync(x).isFile();
const makeObjArr = obj => Object.keys(obj).map(key => [key, obj[key]]);
export const getKey = obj => {
  let arr = makeObjArr(obj).filter(([k,v]) => v).map(([k,v]) => k);
  return arr.length === 0 ? 'base' : arr[0];
};
