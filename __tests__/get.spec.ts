import it from 'ava'
import { Trie as Store } from '../src/Trie'
import d from './lib/data'

it('should return `undefined` if item was not found', t => {
  const store = new Store()
  d.fill(store)

  t.deepEqual(store.get('foo'), undefined)
  t.deepEqual(store.get(null), undefined)
  t.deepEqual(store.get(), undefined)
  t.deepEqual(store.get(undefined), undefined)
  t.deepEqual(store.get(class {}), undefined)
})

it('should return values', t => {
  const store = new Store()
  d.fill(store)

  d.store.forEach(item => {
    const name = item.name
    const man = store.get(name)

    t.deepEqual(man, d.store.get(name))
  })
})
