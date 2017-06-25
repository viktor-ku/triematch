// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')

const a = [
  createBenchmark({
    name: 'set (new store each cycle)',
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
    name: 'set (on existing store)',
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
  runBenchmarks(benchmarks)
}

module.exports = benchmarks
