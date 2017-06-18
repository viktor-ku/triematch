// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const Store = require('../src/Trie')

const benchmark = createBenchmark({
  module,
  name: 'Trie.prototype.reset',
  test () {
    return () => {
      const store = new Store()

      store.set('Michael Jackson', 1)
      store.set('Michael Jacobs', 2)
      store.set('Michael', 3)

      store.reset()
    }
  }
})

module.exports = benchmark
