// @flow
'use strict'

const t = require('tap')
const $ = require('./lib/state')
const Store = require('../src/Trie')
const sinon = require('sinon')

t.test('forEach', t => {
  // t.test('invoke callback for each iteration', t => {
  //   const store = new Store()
  //   $.feed(store)

  //   const callback = sinon.spy()

  //   store.forEach(callback)

  //   t.equal(callback.callCount, $.state.size)

  //   callback.args.forEach(arg => {
  //     const value = arg[0]
  //     const key = arg[1]
  //     const table = arg[2]

  //     t.ok(store.has(key))
  //     t.deepEqual(store.get(key), table.get(key).value)
  //     t.deepEqual(store.get(key), value)
  //   })

  //   t.end()
  // })

  t.test('check that 3d argument is not reference to a table', t => {
    const store = new Store()
    $.feed(store)

    function callback (value, key, table) {
      table.clear()
    }
    console.log(store)
    console.log('----------------------')
    store.forEach(callback)
    console.log(store)
    const names = [
      $.Michael,
      $.MichaelJoseph,
      $.MichaelJones,
      $.MichaelJoneson,
      $.MichaelJimenez,
      $.MichaelJensen,
      $.MichaelJackson,
      $.MichaelJacobs
    ]

    names.forEach((name, i) => {
      const x = store.get(name)

      // t.ok(x)
      // t.equal(x.id, i + 1)
      // t.equal(x.name, name)
    })

    t.end()
  })

  t.end()
})
