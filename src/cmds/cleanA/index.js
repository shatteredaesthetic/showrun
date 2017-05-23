import chalk from 'chalk'

function cleanAudio(path) {}

function cleanProjection(path) {}

function cleanBoth(path) {
  cleanProjection(path)
  cleanAudio(path)
}

function clean({ audio, projection }, path) {
  audio && cleanAudio(path)
  projection && cleanProjection(path)
  both && cleanBoth(path)

  !(audio || projection) && cli.prompt({
    type: 'list',
    name: 'cleanChoice',
    choices: [ 'audio', 'projection', 'both' ],
    default: 'audio'
  }).then(ans => {
    const obj = switch (ans.cleanChoice) {
      case 'projection':
        return { projection: true }
      case 'both':
        return { audio: true, projection: true }
      default:
      case 'audio':
        return { audio: true }
    }
    clean(obj, path)
  })
}

export default function cleanAssets(path) {
  return function(cli) {
    return cli
      .command('clean', `Cleans unused assets from the ${chalk.bgBlack('/assets')} folder`)
      .option('-a, --audio', '')
      .option('-p, --projection', '')
      .option('-b, --both', '')
      .action(function({ options }, cb) {
        const self = this
        clean(options, path)
        cb()
      })
  }
}
