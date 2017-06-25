// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('remove', t => {
  t.test('nothing here', t => {
    const store = new Store()
    $.feed(store, $.state.toArray())

    const a = store.match('not in here')
    t.ok(Array.isArray(a))
    t.equal(a.length, 0)

    t.notOk(store.get('something'))

    t.end()
  })

  t.test('exact match', t => {
    const store = new Store()
    $.feed(store, $.state.toArray())

    const a = store.match($.MichaelJackson)
    t.equal(a.length, 1)
    t.equal(a[0].name, $.MichaelJackson)

    t.end()
  })

  t.test('complete', t => {
    const store = new Store()
    $.feed(store, $.state.toArray())

    const a = store.match($.Michael)
    t.equal(a.length, $.names.length)
    t.equal(a.length, store.match('M').length)

    const o = store.toObject()
    const k = Object.keys(o)
    $.names.forEach(name => t.ok(k.includes(name), name))

    t.end()
  })

  t.test('complete#2', t => {
    const store = new Store()
    $.feed(store, $.state.toArray())

    const a = store.match($.MichaelJones)
    t.equal(a.length, 2)
    t.ok(a.includes($.state.toObject()[$.MichaelJones]))
    t.ok(a.includes($.state.toObject()[$.MichaelJoneson]))

    t.end()
  })

  t.end()
})
