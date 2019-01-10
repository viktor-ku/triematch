import { Trie as Store } from '../src/Trie'
import d from './lib/data'

describe('match', () => {
  test('nothing here', () => {
    const store = new Store()
    d.fill(store)

    const a = store.match('not in here')
    expect(Array.isArray(a)).toBe(true)
    expect(a.length).toBe(0)
  })

  test('exact match', () => {
    const store = new Store()
    d.fill(store)

    const a = store.match(d.MichaelJackson)
    expect(a.length).toBe(1)
    expect(a[0]).toEqual(d.store.get(d.MichaelJackson))
  })

  test('complete', () => {
    const store = new Store()
    d.fill(store)

    const a = store.match(d.Michael)
    expect(a.length).toBe(d.store.size)
    expect(a.length).toBe(store.match('M').length)
  })

  test('complete 2', () => {
    const store = new Store()
    d.fill(store)

    const a = store.match(d.MichaelJones)

    expect(a.length).toBe(2)
    expect(a.some((x) => x === d.store.get(d.MichaelJones))).toBe(true)
    expect(a.some((x) => x === d.store.get(d.MichaelJoneson))).toBe(true)
  })
})
