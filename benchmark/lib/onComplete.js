// @flow
'use strict'

const chalk = require('chalk')

const onComplete = (spinner: Object) => (e: Object) => {
  const bench = e.target
  const elapsed = chalk.green(bench.times.elapsed)

  spinner.succeed(`Finished in ${elapsed} seconds`)

  console.log('    %s', chalk.blue(bench.toString()))
}

module.exports = onComplete
