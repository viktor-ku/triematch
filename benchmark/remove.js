// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const Store = require('../src/Trie')
const runBenchmarks = require('./lib/runBenchmarks')

const a = createBenchmark({
  name: 'remove',
  test () {
    const store = new Store()

    store.set('Michael Jacobs', 2)
    store.set('Michael', 3)
    store.set('Michael Jemens', 4)
    store.set('Michael Joseph', 5)
    store.set('Michael Johnson', 6)

    return () => {
      store.set('Michael Jackson', 1)
      store.remove('Michael Jackson')
    }
  }
})

const benchmarks = [a]

if (require.main === module) {
  runBenchmarks(benchmarks)
}

module.exports = benchmarks
