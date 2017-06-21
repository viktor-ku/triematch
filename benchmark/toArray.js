// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const Store = require('../src/Trie')
const runBenchmarks = require('./lib/runBenchmarks')
const fill = require('./lib/fill')

const a = createBenchmark({
  name: 'toArray (1 item store)',
  test () {
    const store = new Store()
    const item = fill()

    store.set(item.name, item)

    return () => {
      store.toArray()
    }
  }
})

const b = createBenchmark({
  name: 'toArray (1k store)',
  test () {
    const store = new Store()
    let total = 1000

    while (total--) {
      const item = fill()
      store.set(item.name, item)
    }

    return () => {
      store.toArray()
    }
  }
})

const c = createBenchmark({
  name: 'toArray (200k store)',
  test () {
    const store = new Store()
    let total = 200000

    while (total--) {
      const item = fill()
      store.set(item.name, item)
    }

    return () => {
      store.toArray()
    }
  }
})

const benchmarks = [a, b, c]

if (require.main === module) {
  runBenchmarks(benchmarks)
}

module.exports = benchmarks
