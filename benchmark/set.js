// @flow
'use strict'

const createBenchmark = require('./lib/createBenchmark')
const Store = require('../src/Trie')

const benchmark = createBenchmark({
  module,
  name: 'Trie.prototype.set',
  test () {
    return () => {
      const store = new Store()
      store.set('Michael Jackson', { id: 1 })
    }
  }
})

module.exports = benchmark
