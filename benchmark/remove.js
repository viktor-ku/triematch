// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')

const a = [
  createBenchmark({
    name: 'remove (0 items store)',
    test ({ store0: store }) {
      return () => {
        store.remove('What should I remove?')
      }
    }
  }),
  createBenchmark({
    name: 'remove (100 items store)',
    test ({ store100: store }) {
      return () => {
        store.remove('Todd Payne')
      }
    }
  }),
  createBenchmark({
    name: 'remove (1k items store)',
    test ({ store1k: store }) {
      return () => {
        store.remove('Todd Payne')
      }
    }
  }),
  createBenchmark({
    name: 'remove (50k items store)',
    test ({ store50k: store }) {
      return () => {
        store.remove('Todd Payne')
      }
    }
  }),
  createBenchmark({
    name: 'remove (200k items store)',
    test ({ store200k: store }) {
      return () => {
        store.remove('Todd Payne')
      }
    }
  }),
  createBenchmark({
    name: 'remove on fork (200k items store)',
    test ({ store200k: store }) {
      return () => {
        store.remove('Robert Williams')
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
