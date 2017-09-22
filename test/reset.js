// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('reset', t => {
  const store = new Store()
  $.feed(store)

  t.ok(store.table.size)

  store.reset()

  t.notOk(store.table.size)

  t.end()
})
