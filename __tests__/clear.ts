import { Trie as Store } from '../src/Trie'
import d from './lib/data'

describe('clear', () => {
  test('should clear', () => {
    const store = new Store()

    d.fill(store)
    expect(store.size).toBeGreaterThan(0)

    store.set(d.MichaelJimenez, d.store.get(d.MichaelJimenez))
    store.delete(d.MichaelJimenez)

    store.clear()
    expect(store.size).toBe(0)
  })
})
