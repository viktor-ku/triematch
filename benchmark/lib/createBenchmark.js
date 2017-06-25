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
const data200k = require('../../data/store-200k.json')

const store0 = new Store()
const store100 = new Store()
const store1k = new Store()
const store50k = new Store()
const store200k = new Store()

data100.forEach(x => store100.set(x.name, x))
data1k.forEach(x => store1k.set(x.name, x))
data50k.forEach(x => store50k.set(x.name, x))
data200k.forEach(x => store200k.set(x.name, x))

const spinner = new Ora({
  spinner: 'bouncingBar',
  color: 'green'
})

const testArgs = [{
  Store,
  store0,
  store100,
  store1k,
  store50k,
  store200k
}, {
  data100,
  data1k,
  data50k,
  data200k
}]

function createBenchmark (args: { name: string, test: Function }) {
  const options = {
    name: args.name,
    async: true,
    onStart: onStart(spinner),
    onComplete: onComplete(spinner)
  }

  const benchmark = new Benchmark(args.test(...testArgs), options)

  return () => new Promise((resolve, reject) => {
    benchmark.on('complete', resolve)
    benchmark.run()
  })
}

module.exports = createBenchmark
