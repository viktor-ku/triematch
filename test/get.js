// @flow
'use strict'

require('babel-register')

const t = require('tap')
const Store = require('../src/Trie')
const $ = require('./lib/state')

t.test('get', t => {
  t.test('falsy', t => {
    const store = new Store()
    $.feed(store, $.state)

    t.notOk(store.get($.Michael + ' J'))
    t.notOk(store.get('foo'))
    t.notOk(store.get(null))
    t.notOk(store.get([]))
    t.equal(store.get($.MichaelJackson).name, $.MichaelJackson)

    t.end()
  })

  t.test('truthy', t => {
    const store = new Store()
    $.feed(store, $.state)

    $.names.forEach(name => {
      const person = $.state.filter(x => x.name === name)[0]
      const result = store.get(name)
      t.deepEqual(result, person, name)
    })

    t.end()
  })

  t.end()
})
