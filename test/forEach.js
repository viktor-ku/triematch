// @flow
'use strict'

const t = require('tap')
const $ = require('./lib/state')
const Store = require('../src/Trie')
const sinon = require('sinon')

t.test('forEach', t => {
  t.test('invoke callback for each iteration', t => {
    const store = new Store()
    $.feed(store)

    const callback = sinon.spy()

    const iterableTable = Object.keys(store.table)
      .reduce((obj, key) => {
        obj[key] = store.table[key].value
        return obj
      }, {})

    store.forEach(callback)
    const callbackArgs = function () {
      const args = [].slice.call(arguments)
      return args.length === 3
    }
    t.equal(callback.callCount, $.state.size)
    t.equal(callback.args.length, $.state.size)
    t.ok(callback.args.every(callbackArgs), 'expect 3 arguments on each iteration')

    callback.args.forEach((value, key, table) => {
      const currentValue = table[key][0]
      const currentKey = table[key][1]
      const currentTable = table[key][2]
      t.deepEqual(store.get(currentKey), currentValue, `store has valid ${key}`)
      t.deepEqual(currentTable, iterableTable, 'callback gets the entire table')
    })

    t.end()
  })

  t.test('check that 3d argument is not reference to a table', t => {
    const store = new Store()
    $.feed(store)

    function callback (value, key, table) {
      table[key].id = null
      delete table[key].name
    }

    store.forEach(callback)

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

      t.ok(x)
      t.equal(x.id, i + 1)
      t.equal(x.name, name)
    })

    t.end()
  })

  t.end()
})
