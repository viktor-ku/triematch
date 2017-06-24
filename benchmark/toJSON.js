// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')

const a = [
  createBenchmark({
    name: 'toJSON (0 items store)',
    test ({ store0: store }) {
      return () => {
        store.toJSON()
      }
    }
  }),
  createBenchmark({
    name: 'toJSON (100 items store)',
    test ({ store100: store }) {
      return () => {
        store.toJSON()
      }
    }
  }),
  createBenchmark({
    name: 'toJSON (1k items store)',
    test ({ store1k: store }) {
      return () => {
        store.toJSON()
      }
    }
  }),
  createBenchmark({
    name: 'toJSON (50k items store)',
    test ({ store50k: store }) {
      return () => {
        store.toJSON()
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
