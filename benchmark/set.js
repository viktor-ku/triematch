// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')
const name = 'set'
const state = require('./lib/state')
const table = require('./lib/table')

const a = [
  createBenchmark({
    name,
    id: 'new store each cycle',
    test ({ Store }, { data100: data }) {
      const man = data[0]
      const name = man.name

      return () => {
        const store = new Store()
        store.set(name, man)
      }
    }
  }),
  createBenchmark({
    name,
    id: 'on existing store',
    test ({ store100: store }, { data100: data }) {
      const man = data[0]
      const name = man.name

      return () => {
        store.set(name, man)
      }
    }
  })
]

const benchmarks = [
  ...a
]

if (require.main === module) {
  runBenchmarks({
    name,
    benchmarks,
    state,
    table
  })
}

module.exports = {
  name,
  benchmarks
}
