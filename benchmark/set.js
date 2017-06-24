// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')

const a = [
  createBenchmark({
    name: 'set (empty store)',
    test ({ store0: store }, { data100: data }) {
      const man = data[0]
      const number = man.number

      return () => {
        store.set(number, man)
      }
    }
  })
]

const b = [
  createBenchmark({
    name: 'set (full store)',
    test ({ store100: store }, { data100: data }) {
      const man = data[0]
      const number = man.number

      return () => {
        store.set(number, man)
      }
    }
  })
]

const benchmarks = [
  ...a,
  ...b
]

if (require.main === module) {
  runBenchmarks(benchmarks)
}

module.exports = benchmarks
