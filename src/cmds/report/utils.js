import R from 'ramda'

function storageObj(cli) {
  return R.range(0, cli.localStorage.length)
    .map(i => {
      const key = cli.localStorage.key(i)
      return { [key]: cli.localStorage[key] }
    })
    .reduce(R.merge)
}

export function reportMaterials(cli) {
  const { labels, ms, times } = storageObj(cli)
  const arr = (a, b) => [ a, b ]
  return [
    R.zipWith(arr, labels, times),
    R.zipWith(arr, labels, ms)
  ]
}

export const formatDate = R.compose(
  R.join('-'),
  R.tail,
  R.split(' '),
  date => date.toDateString()
)

export const shift = (val, arr) => {
  arr.shift(val)
  return arr
}
