// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')
const sinon = require('sinon')

t.test('keys', t => {
  const store = new Store()
  $.feed(store)
  const keys = store.keys()
  const callback = sinon.spy()

  store.forEach(callback)
  callback.args.forEach(arg => {
    const key = arg[1]
    t.deepEqual(keys.next().value, key)
  })
  t.end()
})
