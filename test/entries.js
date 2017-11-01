// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')
const sinon = require('sinon')

t.test('emtries', t => {
  const store = new Store()
  var map = []
  $.feed(store)
  const entries = store.entries()
  const callback = sinon.spy()
  store.forEach(callback)
  callback.args.forEach(arg => {
    const value = arg[0]
    const key = arg[1]
    map.push(key, value)
    t.deepEqual(entries.next().value, map)
    map = []
  })
  t.end()
})
