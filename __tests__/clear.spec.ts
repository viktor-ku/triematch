import it from 'ava'
import { Trie as Store } from '../src/Trie'
import d from './lib/data'

it('should clear the entire state', t => {
  const store = new Store()

  d.fill(store)
  t.deepEqual(store.size, 8)

  store.clear()
  t.deepEqual(store.size, 0)
})
