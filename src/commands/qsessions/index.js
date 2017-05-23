import { lstatSync, readdirSync } from 'fs'
import { mv } from 'shelljs'
import { join } from 'path'
import R from 'ramda'
import { getKey } from '../../utils'

const getMillis = file => lstatSync(file).mtime.getTime()

const sessionsObj = {
  subOne: '/<1.0.0',
  tech: '/tech',
  base: ''
}

function sessionClean(path, f) {
  return R.compose(
    R.forEach(f),
    R.tail,
    R.sort((a,b) => getMillis(b) - getMillis(a)),
    R.filter(x => lstatSync(x).isFile() && !x.includes('.DS_Store') && !x.includes('changelog')),
    R.map(file => join(`${path}`, 'Sessions', file))
  )
}

export default function qsessions(path) {
  return function(options) {
    let newPath = join(`${path}`, 'Sessions', 'previousSessions', `${sessionsObj[getKey(options)]}`),
        cleanSessions = sessionClean(path, file => mv(file, newPath))
    cleanSessions(readdirSync(`${path}/Sessions/`))
  }
}
