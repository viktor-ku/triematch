// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('match', t => {
  t.test('nothing here', t => {
    const store = new Store()
    $.feed(store)

    const a = store.match('not in here')
    t.ok(Array.isArray(a))
    t.equal(a.length, 0)

    t.end()
  })

  t.test('exact match', t => {
    const store = new Store()
    $.feed(store)

    const a = store.match($.MichaelJackson)
    t.equal(a.length, 1)
    t.deepEqual(a[0], $.state.get($.MichaelJackson))

    t.end()
  })

  t.test('complete', t => {
    const store = new Store()
    $.feed(store)

    const a = store.match($.Michael)
    t.equal(a.length, $.state.size)
    t.equal(a.length, store.match('M').length)

    const o = store.toObject()
    const k = Object.keys(o)
    $.state.forEach(man => {
      t.ok(k.some(key => key === man.name))
    })

    t.end()
  })

  t.test('complete#2', t => {
    const store = new Store()
    $.feed(store)

    const a = store.match($.MichaelJones)
    t.equal(a.length, 2)
    t.ok(a.some(x => x === $.state.get($.MichaelJones)))
    t.ok(a.some(x => x === $.state.get($.MichaelJoneson)))

    t.end()
  })

  t.end()
})
