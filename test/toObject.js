// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('toObject', t => {
  t.test('empty', t => {
    const store = new Store()

    t.deepEqual(store.toObject(), {})

    t.end()
  })

  t.test('full', t => {
    const store = new Store()
    $.feed(store)

    const o = store.toObject()
    t.equal(Object.keys(o).length, 8)

    $.state.forEach(man => {
      const name = man.name
      t.deepEqual(o[name], man, name)
    })

    t.end()
  })

  t.end()
})
