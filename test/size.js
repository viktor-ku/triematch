// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')
const sinon = require('sinon')

t.test('size', t => {
  t.test('compare sizes on creating a store', t => {
    const store = new Store()
    $.feed(store)

    const callback = sinon.spy()
    store.forEach(callback)

    t.equal(callback.callCount, store.size)
    t.end()
  })

  t.test('compare sizes after deleting an element', t => {
    const store = new Store()
    $.feed(store)
    const name = 'Michael Jackson'
    const callback = sinon.spy()

    store.delete(name)
    store.forEach(callback)
    t.equal(callback.callCount, store.size)
    t.end()
  })

  t.test('compare sizes after erasing elements in store', t => {
    const store = new Store()
    $.feed(store)
    const callback = sinon.spy()

    store.clear()
    store.forEach(callback)
    t.equal(callback.callCount, store.size)
    t.end()
  })
  t.end()
})
