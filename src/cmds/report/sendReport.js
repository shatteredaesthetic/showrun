import { reportMaterials, formatDate, shift } from './utils'
import { exec } from 'child_process'

const wrapItem = el => x => `<${el}>${x}</${el}>`
const wrapTH = wrapItem('th')
const wrapTR = wrapItem('tr')
const wrapTD = wrapItem('td')
const wrapTBL = wrapItem('table')
const wrapHTML = wrapItem('html')
const wrapBDY = wrapItem('body')
const wrapP = wrapItem('p')

export default function sendReport(cfg, cli, addr = false) {
  const body = makeEmailBody(reportMaterials(cli), cfg, addr)
  sendEmail(makeEmailMeta(cfg).concat(body))
  if (addr) {
    sendEmail(makeEmailMeta(cfg, addr).concat(body))
  }
}

function sendEmail(text) {
  exec(`echo ${text} | sendmail -t`, (e, stdout, stderr) => {
    return e ? e : false
  })
}

function makeEmailMeta(cfg, addr = false) {
  return [
    `From: ${cfg.sender}`,
    `To: ${addr ? addr : cfg.sm.email}`,
    `Subject: ${cfg.name} Times - ${formatDate(new Date())}`,
    'Mime-Version: 1.0',
    'Content-Type: text/html'
  ].join('\n')
}

function makeEmailBody([ times, durations ], cfg, addr) {
  return wrapHTML(
    wrapBDY(
      wrapP(`${!addr ? `Hey ${cfg.sm.name}, ` : ''}Here are the times and durations:`)
        .concat(makeHtmlTable(times, 'Time'))
        .concat('<hr/>')
        .concat(makeHtmlTable(durations, 'Duration'))
    )
  )
}

function makeHtmlTable(list, lbl) {
  return wrapTBL(
    wrapTR(`${wrapTH('Label')}${wrapTH(lbl)}`)
      .concat(list.map(([a, b]) => wrapTR(`${wrapTD(a)}${wrapTD(b)}`)).join(''))
  )
}
