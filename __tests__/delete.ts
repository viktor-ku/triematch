import { Trie as Store } from '../src/Trie'
import d from './lib/data'

describe('delete', () => {
  test('unexisting thing', () => {
    const store = new Store()
    d.fill(store)

    expect(store.delete('unexisting thing')).toBe(false)
    expect(store.match(d.Michael).length).toBe(d.store.size)
  })

  test('alone', () => {
    const store = new Store()

    store.set(d.MichaelJimenez, d.store.get(d.MichaelJimenez))
    store.delete(d.MichaelJimenez)

    expect(store.size).toBe(0)
    expect(store.get(d.MichaelJimenez)).toBeFalsy()
    expect(store.match(d.MichaelJimenez).length).toBe(0)
    expect(store.rootSocket).toEqual(new Map())
  })

  test('node in the same branch', () => {
    const store = new Store()

    store.set(d.MichaelJones, d.store.get(d.MichaelJones))
    store.set(d.MichaelJoneson, d.store.get(d.MichaelJoneson))

    store.delete(d.MichaelJones)
    expect(store.get(d.MichaelJones)).toBeFalsy()

    expect(store.get(d.MichaelJoneson)).toBeTruthy()
    expect(store.match(d.Michael).length).toBe(1)
  })

  test('leaf in the same branch', () => {
    const store = new Store()

    store.set(d.MichaelJones, d.store.get(d.MichaelJones))
    store.set(d.MichaelJoneson, d.store.get(d.MichaelJoneson))

    store.delete(d.MichaelJoneson)

    expect(store.get(d.MichaelJoneson)).toBeFalsy()
    expect(store.get(d.MichaelJones)).toBeTruthy()
    expect(store.match(d.Michael).length).toBe(1)
  })

  test('fork', () => {
    const store = new Store()

    store.set(d.Michael, d.store.get(d.Michael))
    store.set(d.MichaelJones, d.store.get(d.MichaelJones))
    store.set(d.MichaelJoneson, d.store.get(d.MichaelJoneson))

    store.delete(d.Michael)

    expect(store.get(d.Michael)).toBeFalsy()
    expect(store.get(d.MichaelJones)).toBeTruthy()
    expect(store.get(d.MichaelJoneson)).toBeTruthy()
    expect(store.match(d.Michael).length).toBe(2)
  })

  test('leaf after fork', () => {
    const store = new Store()

    store.set(d.Michael, d.store.get(d.Michael))
    store.set(d.MichaelJones, d.store.get(d.MichaelJones))
    store.set(d.MichaelJoneson, d.store.get(d.MichaelJoneson))

    store.delete(d.MichaelJoneson)

    expect(store.get(d.MichaelJoneson)).toBeFalsy()
    expect(store.get(d.Michael)).toBeTruthy()
    expect(store.get(d.MichaelJones)).toBeTruthy()
    expect(store.match(d.Michael).length).toBe(2)
  })

  test('node after fork', () => {
    const store = new Store()

    store.set(d.Michael, d.store.get(d.Michael))
    store.set(d.MichaelJones, d.store.get(d.MichaelJones))
    store.set(d.MichaelJoneson, d.store.get(d.MichaelJoneson))

    store.delete(d.MichaelJones)

    expect(store.get(d.MichaelJones)).toBeFalsy()
    expect(store.get(d.Michael)).toBeTruthy()
    expect(store.get(d.MichaelJoneson)).toBeTruthy()
    expect(store.match(d.Michael).length).toBe(2)
  })
})
