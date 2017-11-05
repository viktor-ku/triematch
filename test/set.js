// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('set', t => {
  t.test('one value', t => {
    const store = new Store()
    store.set($.MichaelJackson, 1)
    t.equal(store.get($.MichaelJackson), 1)
    t.equal(store.match($.Michael).length, 1)

    t.end()
  })

  t.test('Return Map', t => {
    const store = new Store()
    t.type(store.set($.MichaelJackson, 1), 'Map')
    t.end()
  })
  t.end()
})
