import { Trie as Store } from '../src/Trie'
import d from './lib/data'

describe('set', () => {
  test('one value', () => {
    const store = new Store()

    store.set(d.MichaelJackson, 1)

    expect(store.size).toBe(1)
    expect(store.get(d.MichaelJackson)).toBe(1)
  })

  test('add values with constructor', () => {
    const store = new Store([
      [d.MichaelJackson, 1],
    ])

    expect(store.size).toBe(1)
    expect(store.get(d.MichaelJackson)).toBe(1)
  })

  test('return this', () => {
    const store = new Store()
    expect(store.set(d.MichaelJackson, 1) instanceof Map).toBe(true)
  })
})
