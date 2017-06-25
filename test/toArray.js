// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('toArray', t => {
  t.test('empty', t => {
    const store = new Store()

    t.deepEqual(store.toArray(), [])

    t.end()
  })

  t.test('full', t => {
    const store = new Store()
    $.feed(store)

    const array = store.toArray()
    t.ok(Array.isArray(array))
    t.equal(array.length, 8)

    array.forEach(man => {
      t.deepEqual(man, $.state.get(man.name), man.name)
    })

    t.end()
  })

  t.end()
})
