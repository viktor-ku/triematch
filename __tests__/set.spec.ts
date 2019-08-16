import it from 'ava'
import { Trie as Store } from '../src/Trie'
import d from './lib/data'

it('should set one value using #set', t => {
  const store = new Store()
  store.set(d.MichaelJackson, 1)

  t.deepEqual(store.size, 1)
  t.deepEqual(store.get(d.MichaelJackson), 1)
})

it('should set values with constructor', t => {
  const store = new Store([
    [d.MichaelJackson, 1]
  ])

  t.deepEqual(store.size, 1)
  t.deepEqual(store.get(d.MichaelJackson), 1)
})
