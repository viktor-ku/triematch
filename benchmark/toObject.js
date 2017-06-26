// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')
const createFile = require('./lib/createFile')
const state = require('./lib/state')
const table = require('./lib/table')
const name = 'toObject'

const a = [
  createBenchmark({
    name,
    id: '0 items store',
    test ({ store0: store }) {
      return () => {
        store.toObject()
      }
    }
  }),
  createBenchmark({
    name,
    id: '100 items store',
    test ({ store100: store }) {
      return () => {
        store.toObject()
      }
    }
  }),
  createBenchmark({
    name,
    id: '1k items store',
    test ({ store1k: store }) {
      return () => {
        store.toObject()
      }
    }
  }),
  createBenchmark({
    name,
    id: '50k items store',
    test ({ store50k: store }) {
      return () => {
        store.toObject()
      }
    }
  }),
  createBenchmark({
    name,
    id: '200k items store',
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
