// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')

const a = [
  createBenchmark({
    name: 'match#exact (on 100 items store)',
    test ({ store100: store }) {
      return () => {
        store.match('Virginia Harrington')
      }
    }
  }),
  createBenchmark({
    name: 'match#exact (on 1k items store)',
    test ({ store1k: store }) {
      return () => {
        store.match('Virginia Harrington')
      }
    }
  }),
  createBenchmark({
    name: 'match#exact (on 50k items store)',
    test ({ store50k: store }) {
      return () => {
        store.match('Virginia Harrington')
      }
    }
  }),
  createBenchmark({
    name: 'match#exact (on 200k items store)',
    test ({ store200k: store }) {
      return () => {
        store.match('Virginia Harrington')
      }
    }
  })
]

const b = [
  createBenchmark({
    name: 'match (8 matches on 100 items store)',
    test ({ store100: store }) {
      return () => {
        store.match('A')
      }
    }
  }),
  createBenchmark({
    name: 'match (19 matches on 1k items store)',
    test ({ store1k: store }) {
      return () => {
        store.match('Al')
      }
    }
  }),
  createBenchmark({
    name: 'match (190 matches on 50k items store)',
    test ({ store50k: store }) {
      return () => {
        store.match('Alex')
      }
    }
  }),
  createBenchmark({
    name: 'match (554 matches on 200k items store)',
    test ({ store200k: store }) {
      return () => {
        store.match('Mich')
      }
    }
  })
]

const c = [
  createBenchmark({
    name: 'match (0 items store)',
    test ({ store0: store }) {
      return () => {
        store.match('Is this a joke?')
      }
    }
  })
]

const benchmarks = [
  ...a,
  ...b,
  ...c
]

if (require.main === module) {
  runBenchmarks(benchmarks)
}

module.exports = benchmarks
