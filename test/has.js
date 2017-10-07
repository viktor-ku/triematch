// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('has', t => {
  const store = new Store()
  const name = 'Michael Jackson'

  $.feed(store)
  t.equal(store.has(name), true)

  store.delete(name)

  t.equal(store.has(name), false)
  t.equal(store.has(), false)
  t.end()
})
