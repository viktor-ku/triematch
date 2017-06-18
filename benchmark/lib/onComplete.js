// @flow
'use strict'

const os = require('os')
const chalk = require('chalk')

const onComplete = (spinner: Object) => (e: Object) => {
  const bench = e.target
  const hz = chalk.green(bench.hz)
  const elapsed = chalk.green(bench.times.elapsed)
  const period = chalk.green(bench.times.period * 1000)
  const count = chalk.green(bench.count)

  spinner.succeed(`Finished in ${elapsed} seconds`)

  process.stdout.write(os.EOL)
  console.log('   ', chalk.blue(bench.name))
  process.stdout.write(os.EOL)

  console.log('    Executions per second:', hz, 'times')
  console.log('    The number of times a test was executed:', count, 'times')
  console.log('    The time taken to execute the test once:', period, 'ms')

  process.stdout.write(os.EOL)
}

module.exports = onComplete
