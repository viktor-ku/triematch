import it from 'ava'
import { Trie as Store } from '../src/Trie'
import d from './lib/data'

it('should not find anything', t => {
  const store = new Store()
  d.fill(store)

  const a = store.match('not in here')
  t.deepEqual(a, [])
})

it('should find an exact match', t => {
  const store = new Store()
  d.fill(store)

  const a = store.match(d.MichaelJackson)
  t.deepEqual(a, [d.store.get(d.MichaelJackson)])
})

it('should return two possible variants', t => {
  const store = new Store()
  d.fill(store)

  const a = store.match(d.MichaelJones)
  t.deepEqual(a, [
    d.store.get(d.MichaelJones),
    d.store.get(d.MichaelJoneson)
  ])
})

it('should return complete list', t => {
  const store = new Store()
  d.fill(store)

  const a = store.match(d.Michael)
  t.deepEqual(a.length, d.store.size)
})
