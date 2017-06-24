// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')

const a = [
  createBenchmark({
    name: 'remove (0 items store)',
    test ({ store0: store }) {
      return () => {
        store.remove('065-694-0552')
      }
    }
  }),
  createBenchmark({
    name: 'remove (100 items store)',
    test ({ store100: store }) {
      return () => {
        store.remove('741-003-1010')
      }
    }
  }),
  createBenchmark({
    name: 'remove (1k items store)',
    test ({ store1k: store }) {
      return () => {
        store.remove('265-212-0128')
      }
    }
  }),
  createBenchmark({
    name: 'remove (50k items store)',
    test ({ store50k: store }) {
      return () => {
        store.remove('065-694-0552')
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
