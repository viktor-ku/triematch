// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')

const a = [
  createBenchmark({
    name: 'toObject (0 items store)',
    test ({ store0: store }) {
      return () => {
        store.toObject()
      }
    }
  }),
  createBenchmark({
    name: 'toObject (100 items store)',
    test ({ store100: store }) {
      return () => {
        store.toObject()
      }
    }
  }),
  createBenchmark({
    name: 'toObject (1k items store)',
    test ({ store1k: store }) {
      return () => {
        store.toObject()
      }
    }
  }),
  createBenchmark({
    name: 'toObject (50k items store)',
    test ({ store50k: store }) {
      return () => {
        store.toObject()
      }
    }
  }),
  createBenchmark({
    name: 'toObject (200k items store)',
    test ({ store200k: store }) {
      return () => {
        store.toObject()
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
