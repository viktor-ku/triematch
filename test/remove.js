// @flow
'use strict'

require('babel-register')

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('remove', t => {
  t.test('unexisting thing', t => {
    const store = new Store()
    $.feed(store, $.state)

    store.remove('Michael J')
    t.equal(store.match('Michael J').length, $.names.length)

    t.end()
  })

  t.test('alone', t => {
    const store = new Store()

    store.set($.MichaelJimenez)
    store.remove($.MichaelJimenez)

    t.notOk(store.get($.MichaelJimenez))
    t.equal(store.match($.MichaelJimenez).length, 0)
    t.deepEqual(store.table, {})
    t.deepEqual(store.rootSocket, {})

    t.end()
  })

  t.test('leaf', t => {
    const store = new Store()
    $.feed(store, $.state)

    t.deepEqual(Object.keys(store._getClosestNode('Michael J').socket), [
      'o',
      'i',
      'e',
      'a'
    ])

    store.remove($.MichaelJimenez)

    t.equal(store.match('Mic').length, $.names.length - 1, 'match Mic length')
    t.notOk(store.get($.MichaelJimenez), 'no more Michael Jimenez')
    t.equal(store.toArray().length, $.names.length - 1, 'toArray check')
    t.notOk(store.toObject()[$.MichaelJimenez], 'toObject check')
    t.notOk(store.table[$.MichaelJimenez], 'internal table check')
    t.notOk(store._getClosestNode('Michael Ji'))
    t.notOk(store._getClosestNode('Michael Jim'))
    t.notOk(store._getClosestNode('Michael Jime'))
    t.notOk(store._getClosestNode('Michael Jimen'))
    t.notOk(store._getClosestNode('Michael Jimene'))
    t.notOk(store._getClosestNode('Michael Jimenez'))
    t.deepEqual(Object.keys(store._getClosestNode('Michael J').socket), [
      'o',
      'e',
      'a'
    ])

    t.end()
  })

  t.test('fork', t => {
    const store = new Store()
    $.feed(store, $.state)

    t.deepEqual(Object.keys(store._getClosestNode($.MichaelJones).socket), [
      'o'
    ])

    store.remove($.MichaelJones)

    t.equal(store.match('Mic').length, $.names.length - 1, 'match Mic length')
    t.equal(store.match($.MichaelJones).length, 1)
    t.notOk(store.toObject()[$.MichaelJones], 'toObject check')
    t.notOk(store.get($.MichaelJones))
    t.deepEqual(Object.keys(store._getClosestNode($.MichaelJones).socket), [
      'o'
    ])
    t.ok(store.get($.MichaelJoneson))
    t.equal(store.match('Michael Jon').length, 1)

    t.end()
  })

  t.end()
})
