// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const Store = require('../src/Trie')

const benchmark = createBenchmark({
  module,
  name: 'Trie.prototype.toJSON',
  test () {
    const store = new Store()

    store.set('Michael Jackson', 1)
    store.set('Michael Jacobs', 2)
    store.set('Michael', 3)

    return () => {
      store.toJSON()
    }
  }
})

module.exports = benchmark
