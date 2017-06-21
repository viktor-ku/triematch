// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const Store = require('../src/Trie')
const runBenchmarks = require('./lib/runBenchmarks')

const a = createBenchmark({
  name: 'set one item',
  test () {
    return () => {
      const store = new Store()
      store.set('Michael Jackson', { id: 1 })
    }
  }
})

const benchmarks = [a]

if (require.main === module) {
  runBenchmarks(benchmarks)
}

module.exports = benchmarks
