// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('clear', t => {
  const store = new Store()
  $.feed(store)

  t.ok(store.table.size)

  store.clear()

  t.notOk(store.table.size)

  t.end()
})
