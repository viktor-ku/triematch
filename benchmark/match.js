// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const runBenchmarks = require('./lib/runBenchmarks')
const name = 'match'
const state = require('./lib/state')
const table = require('./lib/table')

const a = [
  createBenchmark({
    name,
    id: 'exact match on 100 items store',
    test ({ store100: store }) {
      return () => {
        store.match('Virginia Harrington')
      }
    }
  }),
  createBenchmark({
    name,
    id: 'exact match on 1k items store',
    test ({ store1k: store }) {
      return () => {
        store.match('Virginia Harrington')
      }
    }
  }),
  createBenchmark({
    name,
    id: 'exact match on 50k items store',
    test ({ store50k: store }) {
      return () => {
        store.match('Virginia Harrington')
      }
    }
  }),
  createBenchmark({
    name,
    id: 'exact match on 200k items store',
    test ({ store200k: store }) {
      return () => {
        store.match('Virginia Harrington')
      }
    }
  })
]

const b = [
  createBenchmark({
    name,
    id: '8 matches on 100 items store',
    test ({ store100: store }) {
      return () => {
        store.match('A')
      }
    }
  }),
  createBenchmark({
    name,
    id: '19 matches on 1k items store',
    test ({ store1k: store }) {
      return () => {
        store.match('Al')
      }
    }
  }),
  createBenchmark({
    name,
    id: '7 matches on 50k items store',
    test ({ store50k: store }) {
      return () => {
        store.match('John A')
      }
    }
  }),
  createBenchmark({
    name,
    id: '483 matches on 50k items store',
    test ({ store50k: store }) {
      return () => {
        store.match('Jos')
      }
    }
  }),
  createBenchmark({
    name,
    id: '9 matches on 200k items store',
    test ({ store200k: store }) {
      return () => {
        store.match('Michael A')
      }
    }
  }),
  createBenchmark({
    name,
    id: '554 matches on 200k items store',
    test ({ store200k: store }) {
      return () => {
        store.match('Mich')
      }
    }
  })
]

const c = [
  createBenchmark({
    name,
    id: '0 items store',
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
