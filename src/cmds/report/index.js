import chalk from 'chalk'
import { Table } from 'cli-table2'
import sendReport from './sendReport'
import saveReport from './saveReport'
import { reportMaterials } from './utils'

const makeCliTable = (label, list) =>
  new Table({
    head: [ 'Label', label ],
    colWidths: [ 300, 100 ]
  }).push(...list)

function printReport(cli) {
  const [ times, durations ] = reportMaterials(cli)
  const timesTable = makeCliTable('Time', times).toString()
  const durationsTable = makeCliTable('Duration', durations).toString()
  cli.log(`${timesTable}\n\n${durationsTable}`)
}

function reportHandler(options, path, cfg, cli) {
  const { email, save } = options
  email && sendReport(cfg, cli)
  save && saveReport(path, cli)
  options.address && sendReport(cfg, cli, options.address)
  !(email || save) && printReport(cli)
}

export default function report(cfg, path) {
  return function(cli) {
    cli.localStorage('timestamp')
    return cli
      .command('report', 'creates report from timestamps, saves it to disk and/or emails it')
      .option('-e, --email', `email to address in ${chalk.bgBlack('.qmanage.yaml')}`)
      .option('-s, --save', `save report as text file in ${chalk.bgBlack('/times')}`)
      .option('-a, --address <addr>', `email to given ${chalk.blue('addr')}`)
      .types({ string: ['a', 'address'] })
      .action(function({ options }, cb) {
        const self = this
        reportHandler(options, path, cfg, self)
        cb()
      })
  }
}
