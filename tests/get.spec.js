import { describe, it, expect } from 'vitest'
import { Trie } from '@/Trie'

describe('get', () => {
  it('returns undefined for missing/invalid keys', () => {
    const it = new Trie()
    expect(it.get('missing')).toBeUndefined()
    // invalid values should be safely handled
    expect(it.get(null)).toBeUndefined()
    expect(it.get()).toBeUndefined()
    expect(it.get(undefined)).toBeUndefined()
    expect(it.get(class {})).toBeUndefined()
  })

  it('returns stored values', () => {
    const it = new Trie()
    it.set('foo', { id: 1, name: 'foo' })
    it.set('bar', { id: 2, name: 'bar' })
    expect(it.get('foo')).toStrictEqual({ id: 1, name: 'foo' })
    expect(it.get('bar')).toStrictEqual({ id: 2, name: 'bar' })
  })
})


