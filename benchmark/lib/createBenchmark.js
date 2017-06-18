// @flow
'use strict'

const Benchmark = require('benchmark')
const Ora = require('ora')
const onComplete = require('./onComplete')
const onStart = require('./onStart')

type args = {
  name: string,
  test: Function,
  module: Object
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

  if (require.main === args.module) {
    benchmark.run()
  }

  return benchmark
}

module.exports = createBenchmark
