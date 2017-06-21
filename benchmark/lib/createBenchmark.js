// @flow
'use strict'

const Benchmark = require('benchmark')
const Ora = require('ora')
const onComplete = require('./onComplete')
const onStart = require('./onStart')

type args = {
  name: string,
  test: Function
}

function createBenchmark (args: args) {
  const spinner = new Ora({
    spinner: 'bouncingBar',
    color: 'green'
  })

  const options = {
    name: args.name,
    async: true,
    onStart: onStart(spinner),
    onComplete: onComplete(spinner)
  }

  const benchmark = new Benchmark(args.test(), options)

  return () => new Promise((resolve, reject) => {
    benchmark.on('complete', resolve)
    benchmark.run()
  })
}

module.exports = createBenchmark
