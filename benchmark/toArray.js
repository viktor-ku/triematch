// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const Store = require('../src/Trie')

const benchmark = createBenchmark({
  module,
  name: 'Trie.prototype.toArray',
  test () {
    const store = new Store()

    store.set('Michael Jackson', 1)
    store.set('Michael Jacobs', 2)
    store.set('Michael', 3)

    return () => {
      store.toArray()
    }
  }
})

module.exports = benchmark
