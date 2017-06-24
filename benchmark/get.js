// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')

const a = [
  createBenchmark({
    name: 'get (0 items store)',
    test ({ store0: store }) {
      return () => {
        store.get('Todd Payne')
      }
    }
  }),
  createBenchmark({
    name: 'get (100 items store)',
    test ({ store100: store }) {
      return () => {
        store.get('Todd Payne')
      }
    }
  }),
  createBenchmark({
    name: 'get (1k items store)',
    test ({ store1k: store }) {
      return () => {
        store.get('Todd Payne')
      }
    }
  }),
  createBenchmark({
    name: 'get (50k items store)',
    test ({ store50k: store }) {
      return () => {
        store.get('Todd Payne')
      }
    }
  }),
  createBenchmark({
    name: 'get (200k items store)',
    test ({ store200k: store }) {
      return () => {
        store.get('Todd Payne')
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
