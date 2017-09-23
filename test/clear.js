// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('clear', t => {
  const store = new Store()
  $.feed(store)

  t.ok(store.cache.size)

  store.clear()

  t.notOk(store.cache.size)

  t.end()
})
