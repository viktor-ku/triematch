// @flow
'use strict'

require('babel-register')

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('reset', t => {
  const store = new Store()
  $.feed(store, $.state)

  t.equal(store.toArray().length, 7, 'before reset')
  t.ok(store.get($.MichaelJackson))

  store.reset()

  t.equal(store.toArray().length, 0, 'after reset')
  t.notOk(store.get($.MichaelJackson))

  t.end()
})
