// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('reset', t => {
  const store = new Store()
  $.feed(store)

  t.equal(store.toArray().length, $.state.size, 'before reset')

  store.reset()

  t.equal(store.toArray().length, 0, 'after reset')

  t.end()
})
