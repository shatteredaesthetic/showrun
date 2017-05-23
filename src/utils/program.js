const Program = cli => ({
  fold: delim => cli.delimiter(delim).show(),
  map: f => Program(f(cli))
})

export default Program
