// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('has', t => {
  const store = new Store()
  const name = 'Michael Jackson'

  $.feed(store)
  t.ok(store.has(name))

  store.delete(name)

  t.notOk(store.has(name))
  t.notOk(store.has())
  t.end()
})
