function archiveProj(path) {
  
}

export default function archive(path) {
  return function(cli) {
    return cli
      .command('archive', 'zip the project folder for storage')
      .action(function(args, cb) {
        const self = this
        archiveProj(path)
        cb()
      })
  }
}
