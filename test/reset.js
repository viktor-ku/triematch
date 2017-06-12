// @flow
'use strict'

require('babel-register')

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('reset', t => {
  const store = new Store()
  $.feed(store, $.state.toArray())

  t.equal(store.toArray().length, $.names.length, 'before reset')
  t.ok(store.get($.MichaelJackson))

  store.reset()

  t.equal(store.toArray().length, 0, 'after reset')
  t.notOk(store.get($.MichaelJackson))

  t.end()
})
