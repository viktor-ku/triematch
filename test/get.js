// @flow
'use strict'

require('babel-register')

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('get', t => {
  const store = new Store()
  $.feed(store, $.state)

  t.notOk(store.get('Michael'))
  t.notOk(store.get('foo'))
  t.notOk(store.get(null))
  t.notOk(store.get([]))
  t.equal(store.get($.MichaelJackson).name, $.MichaelJackson)
  t.end()
})
