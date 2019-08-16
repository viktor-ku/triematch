import it from 'ava'
import { Trie as Store } from '../src/Trie'
import d from './lib/data'

it('should not change the state when trying to delete unexisting thing', t => {
  const store = new Store()
  d.fill(store)

  t.deepEqual(store.delete('unexisting thing'), false)
  t.deepEqual(store.size, d.store.size)
  t.deepEqual(store.match(d.Michael).length, d.store.size)
})

it('should delete exactly one item', t => {
  const store = new Store()

  store.set(d.MichaelJimenez, 1)
  store.delete(d.MichaelJimenez)

  t.deepEqual(store.size, 0)
  t.deepEqual(store.get(d.MichaelJimenez), undefined)
  t.deepEqual(store.match(d.Michael), [])
  t.deepEqual(store.rootSocket, new Map())
})

it('should delete node in the same branch', t => {
  const store = new Store()

  store.set(d.MichaelJones, 1)
  store.set(d.MichaelJoneson, 2)

  store.delete(d.MichaelJones)
  t.deepEqual(store.get(d.MichaelJones), undefined)

  t.deepEqual(store.get(d.MichaelJoneson), 2)
  t.deepEqual(store.match(d.Michael), [2])
})

it('should delete leaf in the same branch', t => {
  const store = new Store()

  store.set(d.MichaelJones, 1)
  store.set(d.MichaelJoneson, 2)
  store.delete(d.MichaelJoneson)

  t.deepEqual(store.get(d.MichaelJones), 1)
  t.deepEqual(store.get(d.MichaelJoneson), undefined)
  t.deepEqual(store.match(d.Michael), [1])
})

it('should delete fork', t => {
  const store = new Store()

  store.set(d.Michael, 1)
  store.set(d.MichaelJones, 2)
  store.set(d.MichaelJoneson, 3)

  store.delete(d.Michael)

  t.deepEqual(store.get(d.Michael), undefined)
  t.deepEqual(store.get(d.MichaelJones), 2)
  t.deepEqual(store.get(d.MichaelJoneson), 3)
  t.deepEqual(store.match(d.Michael), [2, 3])
})

it('should delete leaf after fork', t => {
  const store = new Store()

  store.set(d.Michael, 1)
  store.set(d.MichaelJones, 2)
  store.set(d.MichaelJoneson, 3)

  store.delete(d.MichaelJoneson)

  t.deepEqual(store.get(d.Michael), 1)
  t.deepEqual(store.get(d.MichaelJones), 2)
  t.deepEqual(store.get(d.MichaelJoneson), undefined)
  t.deepEqual(store.match(d.Michael), [1, 2])
})

it('should delete node after fork', t => {
  const store = new Store()

  store.set(d.Michael, 1)
  store.set(d.MichaelJones, 2)
  store.set(d.MichaelJoneson, 3)

  store.delete(d.MichaelJones)

  t.deepEqual(store.get(d.Michael), 1)
  t.deepEqual(store.get(d.MichaelJones), undefined)
  t.deepEqual(store.get(d.MichaelJoneson), 3)
  t.deepEqual(store.match(d.Michael), [1, 3])
})
