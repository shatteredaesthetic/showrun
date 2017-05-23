import { writeFile } from 'fs'
import R from 'ramda'
import { reportMaterials, formatDate, shift } from './utils'

const labelLength = R.compose(
  R.head,
  R.sort((a, b) => b - a),
  R.map(x => x.length),
  R.map(R.head)
)

const makeTable = (list, lbl, n) =>
  shift([ 'Label', lbl ], list)
    .map((a, b) => `${a.padEnd(n, ' ')}| ${b}`)
    .join('\n')

export default function saveReport(path, cli) {
  const dateStr = formatDate(new Date())
  const [ times, durations ] = reportMaterials(cli)
  const longest = labelLength(times) + 3
  const content = makeTable(times, 'Time', longest)
    .concat('\n\n')
    .concat(makeTable(durations, 'Duration', longest))
  writeFile(`${path}/times/${dateStr}.txt`, `Times - ${dateStr}:\n\n`.concat(content))
}
