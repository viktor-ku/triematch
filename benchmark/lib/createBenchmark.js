// @flow
'use strict'

const Benchmark = require('benchmark')
const Ora = require('ora')
const onComplete = require('./onComplete')
const onStart = require('./onStart')
const Store = require('../../src/Trie')

const data100 = require('../../data/store-100.json')
const data1k = require('../../data/store-1k.json')
const data50k = require('../../data/store-50k.json')

const store0 = new Store()
const store100 = new Store()
const store1k = new Store()
const store50k = new Store()

data100.forEach(x => store100.set(x.number, x))
data1k.forEach(x => store1k.set(x.number, x))
data50k.forEach(x => store50k.set(x.number, x))

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

  const testArgs = {
    store0,
    store100,
    store1k,
    store50k
  }

  const benchmark = new Benchmark(args.test(testArgs), options)

  return () => new Promise((resolve, reject) => {
    benchmark.on('complete', resolve)
    benchmark.run()
  })
}

module.exports = createBenchmark
