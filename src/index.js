#!/usr/bin/env node

import { readFileSync } from 'fs'
import vorpal from 'vorpal'
import { safeLoad } from 'js-yaml'
import R from 'ramda'
import Program from './utils/program'
import timestamp from './cmds/timestamp'
import report from './cmds/report'
import sessions from './cmds/sessions'
import init from './cmds/init'

const path = process.argv.slice(2)
const cfg = safeLoad(readFileSync(`${path}/.qmanage.yaml`, 'utf8'))

function main() {
  Program(vorpal())
    .map(R.compose(
      timestamp(cfg.labels, path),
      report(cfg, path),
      sessions(path),
      init(path)
    ))
    .fold('qmanage >')
}

main()
