import { Trie as Store } from '../src/Trie'
import d from './lib/data'

describe('get', () => {
  test('falsy', () => {
    const store = new Store()
    d.fill(store)

    expect(store.get('foo')).toBeFalsy()
    expect(store.get(null)).toBeFalsy()
    expect(store.get([])).toBeFalsy()
    expect(store.get()).toBeFalsy()
    expect(store.get(function foo() {})).toBeFalsy()
  })

  test('truthy', () => {
    const store = new Store()
    d.fill(store)

    d.store.forEach((item) => {
      const name = item.name
      const man = store.get(name)

      expect(man).toEqual(d.store.get(name))
    })
  })
})
