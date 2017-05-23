import chalk from 'chalk'

/*
  localStorage:
  times: [],
  ms: [],
  labels: [] -- loaded from the config
*/

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
  cli.localStorage['times'].push(time)
  cli.localStorage['ms'].push(ms)
}

function setTimestamp(options, cli) {
  const ts = newTimeIO()
  return options.label ? newLabelTimestamp(ts, options.label, cli) : nextTimestamp(ts, cli)
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
      .command('timestamp', 'logs a timestamp')
      .option('-l, --label <lbl>', `logs a timestamp with provided ${chalk.blue('lbl')} not in config`)
      .types({ string: ['l', 'label'] })
      .action(function({ options }, cb){
        const self = this
        setTimestamp(options, self)
        cb()
      })
  }
}
