// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('get', t => {
  t.test('falsy', t => {
    const store = new Store()
    $.feed(store)

    t.notOk(store.get('foo'))
    t.notOk(store.get(null))
    t.notOk(store.get([]))
    t.notOk(store.get())
    t.notOk(store.get(function foo () {}))

    t.end()
  })

  t.test('truthy', t => {
    const store = new Store()
    $.feed(store)

    $.state.forEach(item => {
      const name = item.name
      const man = store.get(name)
      t.deepEqual(man, $.state.get(name), name)
    })

    t.end()
  })

  t.end()
})
