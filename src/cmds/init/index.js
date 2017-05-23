import { writeFile } from 'fs'
import { exec } from 'child_process'
import questions from './questions'

function makeCfgLabels(ans) {
  return [
    ans.pre ? 'Preshow' : '',
    ans.curtain ? 'Curtain Speech' : '',
    'Act I',
    ans.inter ? 'Intermission' : '',
    'Act II',
    'EoS'
  ]
    .filter(str => str !== '')
    .map(str => `    - ${str}`)
    .join('\n')
}

function makeCfg(ans) {
  return `name: ${ans.projName}\n`
    .concat(`sm:\n`)
    .concat(`    name: ${ans.smName}\n`)
    .concat(`    email: ${ans.smEmail}\n`)
    .concat(`sender: ${ans.sender}\n`)
    .concat(makeCfgLabels(ans))
}

function createFolderStructure(ans) {
  let assets = switch(ans.assets) {
    case 'Projections':
      return [ 'assets/projection' ]
      break;
    case 'Both':
      return [ 'assets/audio', 'assets/projection' ]
      break;
    case 'Audio':
    default:
      return [ 'assets/audio' ]
  }
    .join(' ')
  const sess = `sessions sessions/previousSessions sessions/previousSessions/<1.0.0 sessions/previousSessions/tech`
  const snd = `${ans.pre ? 'pre/' : ''}${ans.inter ? 'int/' : ''}${ans.post ? 'post' : ''}`
  const as = assets.split(' ').includes('assets/audio') ?
    as.concat(` ${snd ? `assets/audio/${snd}` : ''} assets/audio/show assets/.scripts`) :
    assets.concat('.scripts')

  exec(`mkdir documentation ${sess} assets ${as}`, (e,o,se) => ())
}

function initProject(path, cli) {
  exec(`ls ${path}`, (e, o, se) => ())
  cli.prompt(questions).then(ans => {
    writeFile(`${path}/.qmanage.yaml`, makeCfg(ans))
    createFolderStructure(ans)
  })
}

export default function init(path) {
  return function(cli) {
    return cli
      .command('init', 'initializes new project')
      .action((args, cb) => {
        const self = this
        initProject(path, self)
        cb()
      })
  }
}
