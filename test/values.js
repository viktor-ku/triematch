// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')
const sinon = require('sinon')

t.test('values', t => {
  const store = new Store()
  $.feed(store)
  const values = store.values()
  const callback = sinon.spy()

  store.forEach(callback)
  callback.args.forEach(arg => {
    const val = arg[0]
    t.deepEqual(values.next().value, val)
  })
  t.end()
})