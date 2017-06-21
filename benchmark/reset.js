// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const Store = require('../src/Trie')
const runBenchmarks = require('./lib/runBenchmarks')

const a = createBenchmark({
  name: 'reset',
  test () {
    const store = new Store()

    return () => {
      store.reset()
    }
  }
})

const benchmarks = [a]

if (require.main === module) {
  runBenchmarks(benchmarks)
}

module.exports = benchmarks
