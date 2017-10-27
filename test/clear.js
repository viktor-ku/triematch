// @flow
'use strict'

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('clear', t => {
  const store = new Store()
  // $.feed(store)
  // t.ok(store.size)
  store.set($.MichaelJimenez, $.state.get($.MichaelJimenez))
  console.log(store.keys())
  // console.log(store.rootSocket)
  console.log(store.match($.MichaelJimenez))
  store.delete($.MichaelJimenez)
  console.log(store.match($.MichaelJimenez).length)
  // console.log('--------------------------------------')
  // console.log(store.keys())
  // console.log(store.rootSocket)
  store.clear()
  // console.log('--------------------------------------')
  // console.log(store.keys())
  // console.log(store.rootSocket)
  t.notOk(store.size)

  t.end()
})
