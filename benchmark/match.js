// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')

const a = [
  createBenchmark({
    name: 'match#exact (0 items store)',
    test ({ store0: store }) {
      return () => {
        store.match('065-694-0552')
      }
    }
  }),
  createBenchmark({
    name: 'match#exact (100 items store)',
    test ({ store100: store }) {
      return () => {
        store.match('741-003-1010')
      }
    }
  }),
  createBenchmark({
    name: 'match#exact (1k items store)',
    test ({ store1k: store }) {
      return () => {
        store.match('265-212-0128')
      }
    }
  }),
  createBenchmark({
    name: 'match#exact (50k items store)',
    test ({ store50k: store }) {
      return () => {
        store.match('065-694-0552')
      }
    }
  })
]

const b = [
  createBenchmark({
    name: 'match (0 items store)',
    test ({ store0: store }) {
      return () => {
        store.match('065')
      }
    }
  }),
  createBenchmark({
    name: 'match (100 items store)',
    test ({ store100: store }) {
      return () => {
        store.match('741')
      }
    }
  }),
  createBenchmark({
    name: 'match (1k items store)',
    test ({ store1k: store }) {
      return () => {
        store.match('265')
      }
    }
  }),
  createBenchmark({
    name: 'match (50k items store)',
    test ({ store50k: store }) {
      return () => {
        store.match('065')
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
