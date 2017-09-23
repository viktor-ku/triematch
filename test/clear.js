// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('clear', t => {
  const store = new Store()
  $.feed(store)
  t.ok(store.size)
  store.set($.MichaelJimenez, $.state.get($.MichaelJimenez))
  store.delete($.MichaelJimenez)
  store.clear()
  t.notOk(store.size)

  t.end()
})
