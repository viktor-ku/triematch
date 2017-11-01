// @flow
'use strict'

const t = require('tap')
const $ = require('./lib/state')
const Store = require('../src/Trie')
const sinon = require('sinon')

t.test('forEach', t => {
  t.test('invoke callback for each iteration', t => {
    const store = new Store()
    $.feed(store)
    const callback = sinon.spy()
    store.forEach(callback)
    t.equal(callback.callCount, $.state.size)
    t.end()
  })

  t.end()
})
