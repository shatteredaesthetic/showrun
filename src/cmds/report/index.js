import chalk from 'chalk'
import { Table } from 'cli-table2'
import sendReport from './sendReport'
import saveReport from './saveReport'
import { reportMaterials } from './utils'

function printReport(cli) {
  const [ times, durations ] = reportMaterials(cli)
  const timesTable = new Table({
    head: [ 'Label', 'Time' ],
    colWidths: [ 300,100 ]
  }).push(...times)
  const durationsTable = new Table({
    head: [ 'Label', 'Duration' ],
    colWidths: [ 300, 100 ]
  }).push(...durations)
  cli.log(`${timesTable.toString()}\n\n${durationsTable.toString()}`)
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
      .command('report', 'creates report from timestamps, saves it to dick and/or emails it')
      .option('-e, --email', 'email to address in .qmanage.yaml')
      .option('-s, --save', 'save report as text file in /times')
      .option('-a, --address <addr>', `email to given ${chalk.blue('addr')}`)
      .types({ string: ['a', 'address'] })
      .action(function({ options }, cb) {
        const self = this
        reportHandler(options, path, cfg, self)
        cb()
      })
  }
}
