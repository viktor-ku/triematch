// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('get', t => {
  t.test('falsy', t => {
    const store = new Store()
    $.feed(store, $.state.toArray())

    t.notOk(store.get($.Michael + ' J'))
    t.notOk(store.get('foo'))
    t.notOk(store.get(null))
    t.notOk(store.get([]))
    t.equal(store.get($.MichaelJackson).name, $.MichaelJackson)

    t.end()
  })

  t.test('truthy', t => {
    const store = new Store()
    $.feed(store, $.state.toArray())

    $.names.forEach(name => {
      const result = store.get(name)
      t.deepEqual(result, $.state.toObject()[name], name)
    })

    t.end()
  })

  t.end()
})
