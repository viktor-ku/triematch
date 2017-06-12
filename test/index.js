// @flow
'use strict'

require('babel-register')

const t = require('tap')
const Store = require('../src/Trie')

const names = [
  'Michael Joseph',
  'Michael Jones',
  'Michael Joneson',
  'Michael Jimenez',
  'Michael Jensen',
  'Michael Jackson',
  'Michael Jacobs'
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
    t.deepEqual(store.get('Michael Jackson'), state.filter(x => x.name === 'Michael Jackson')[0])

    t.end()
  })

  t.test('exact match', t => {
    const store = new Store()
    feed(store, state)

    const a = store.match('Michael Jackson')
    t.equal(a.length, 1)
    t.equal(a[0].name, 'Michael Jackson')

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

    const a = store.match('Michael Jones')
    t.equal(a.length, 2)
    t.ok(a.includes(state.filter(x => x.name === 'Michael Jones')[0]))
    t.ok(a.includes(state.filter(x => x.name === 'Michael Joneson')[0]))

    t.end()
  })

  t.test('reset', t => {
    const store = new Store()
    feed(store, state)

    t.equal(store.toArray().length, 7, 'before reset')
    t.ok(store.get('Michael Jackson'))

    store.reset()

    t.equal(store.toArray().length, 0, 'after reset')
    t.notOk(store.get('Michael Jackson'))

    t.end()
  })

  t.end()
})
