// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const Store = require('../src/Trie')
const runBenchmarks = require('./lib/runBenchmarks')
const fill = require('./lib/fill')

const a = createBenchmark({
  name: 'match (1k store)',
  test () {
    const store = new Store()
    let total = 1000

    while (total--) {
      const item = fill()
      store.set(item.name, item)
    }

    store.set('Michael Jackson', 1)
    store.set('Michael Jacobs', 2)
    store.set('Michael', 3)

    return () => {
      store.match('Michael')
    }
  }
})

const b = createBenchmark({
  name: 'match (200k store)',
  test () {
    const store = new Store()
    let total = 200000

    while (total--) {
      const item = fill()
      store.set(item.name, item)
    }

    store.set('Michael Jackson', 1)
    store.set('Michael Jacobs', 2)
    store.set('Michael', 3)

    return () => {
      store.match('Michael')
    }
  }
})

const benchmarks = [a, b]

if (require.main === module) {
  runBenchmarks(benchmarks)
}

module.exports = benchmarks
