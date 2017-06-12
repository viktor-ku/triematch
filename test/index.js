// @flow
'use strict'

require('babel-register')

const t = require('tap')
const Store = require('../src/Trie')

const MichaelJoseph = 'Michael Joseph'
const MichaelJones = 'Michael Jones'
const MichaelJoneson = 'Michael Joneson'
const MichaelJimenez = 'Michael Jimenez'
const MichaelJensen = 'Michael Jensen'
const MichaelJackson = 'Michael Jackson'
const MichaelJacobs = 'Michael Jacobs'

const names = [
  MichaelJoseph,
  MichaelJones,
  MichaelJoneson,
  MichaelJimenez,
  MichaelJensen,
  MichaelJackson,
  MichaelJacobs
]

const state = Array(names.length).fill().map((_, i) => ({
  id: i + 1,
  name: names[i]
}))

const feed = (store, state) => state.forEach(x => store.set(x.name, x))

t.test('Trie', t => {
  t.test('nothing here', t => {
    const store = new Store()

    const a = store.match('not in here')
    t.ok(Array.isArray(a))
    t.equal(a.length, 0)

    t.notOk(store.get('something'))

    t.end()
  })

  t.test('get node', t => {
    const store = new Store()
    feed(store, state)

    t.notOk(store.get('Michael'))
    t.notOk(store.get('foo'))
    t.notOk(store.get(null))
    t.notOk(store.get([]))
    t.equal(store.get(MichaelJackson).name, MichaelJackson)

    t.end()
  })

  t.test('exact match', t => {
    const store = new Store()
    feed(store, state)

    const a = store.match(MichaelJackson)
    t.equal(a.length, 1)
    t.equal(a[0].name, MichaelJackson)

    t.end()
  })

  t.test('complete', t => {
    const store = new Store()
    feed(store, state)

    const a = store.match('Michael')
    t.equal(a.length, 7)
    t.equal(a.length, store.match('M').length)

    const o = store.toObject()
    const k = Object.keys(o)
    names.forEach(name => t.ok(k.includes(name), name))

    t.end()
  })

  t.test('complete#2', t => {
    const store = new Store()
    feed(store, state)

    const a = store.match(MichaelJones)
    t.equal(a.length, 2)
    t.ok(a.includes(state.filter(x => x.name === MichaelJones)[0]))
    t.ok(a.includes(state.filter(x => x.name === MichaelJoneson)[0]))

    t.end()
  })

  t.test('reset', t => {
    const store = new Store()
    feed(store, state)

    t.equal(store.toArray().length, 7, 'before reset')
    t.ok(store.get(MichaelJackson))

    store.reset()

    t.equal(store.toArray().length, 0, 'after reset')
    t.notOk(store.get(MichaelJackson))

    t.end()
  })

  t.test('remove', t => {
    const store = new Store()
    feed(store, state)

    t.deepEqual(Object.keys(store._getClosestNode('Michael J').socket), [
      'o',
      'i',
      'e',
      'a'
    ])

    store.remove(MichaelJimenez)

    t.equal(store.match('Mic').length, names.length - 1, 'match Mic length')
    t.notOk(store.get(MichaelJimenez), 'no more Michael Jimenez')
    t.equal(store.toArray().length, names.length - 1, 'toArray check')
    t.notOk(store.toObject()[MichaelJimenez], 'toObject check')
    t.notOk(store.table[MichaelJimenez], 'internal table check')
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

  t.end()
})
