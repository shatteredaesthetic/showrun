import chalk from 'chalk'

/*
  localStorage:
  times: [],
  ms: [],
  labels: [] -- loaded from the config
*/

const push = (val, arr) => {
  arr.push(val)
  return arr
}

function newTimeIO() {
  let t = new Date();
  return [ t.toLocaleTimeString('en-US', {hour12: false}), t.getTime() ];
}

function newLabelTimestamp(times, label, cli) {
  const lbls = cli.localStorage['labels']
  const pivot = cli.localStorage['times'].length
  cli.localStorage.setItem('labels', lbls.slice(0, pivot).concat([label]).concat(lbls.slice(pivot)))
  nextTimestamp(times, cli)
}

function nextTimestamp([ time, ms ], cli) {
  const store = cli.localStorage
  store.setItem('times', push(time, store['times']))
  store.setItem('ms', push(ms, store['ms']))
}

function setTimestamp(cli, lbl = false) {
  const ts = newTimeIO()
  return lbl ? newLabelTimestamp(ts, lbl, cli) : nextTimestamp(ts, cli)
}

function initLocal(cli, labels) {
  cli.localStorage('timestamp')
  cli.localStorage.setItem('labels', labels)
  cli.localStorage.setItem('ms', [])
  cli.localStorage.setItem('times', [])
}

export default timestamp(labels, path) {
  return function(cli) {
    initLocal(cli, labels)
    return cli
      .command('timestamp [lbl]', `logs a timestamp with label from config, if ${chalk.blue('lbl')} isn't provided`)
      .action(function({ lbl }, cb){
        const self = this
        lbl ? setTimestamp(self, lbl) : setTimestamp(self)
        cb()
      })
  }
}
