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

function orgSessions(path) {
  return R.compose(
    R.sort((a,b) => getMillis(b) - getMillis(a)),
    R.filter(x => lstatSync(x).isFile() && !x.includes('.DS_Store') && !x.includes('changelog')),
    R.map(file => join(`${path}`, 'Sessions', file))
  )
}

function clean(options, path, cli) {
  let newPath = join(`${path}`, 'Sessions', 'previousSessions', `${sessionsObj[getKey(options)]}`),
      cleanSessions = R.compose(
        R.forEach(file => mv(file, newPath)),
        R.tail,
        orgSessions
      )(path)
  cleanSessions(readdirSync(`${path}/Sessions/`))
}

export default sessions(path) {
  return function(cli) {
    return cli
      .command('sessions', 'organize the versioned qlab sessions')
      .option('-s, --sub-one', 'move to "previousSessions/<1.0.0" folder')
      .option('-t, --tech', 'move to "previousSessions/tech" folder')
      .action(({ options }, cb) => {
        const self = this
        clean(options, path, self)
        cb()
      })
  }
}
