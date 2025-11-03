import { describe, expect, it } from 'vitest'
import { Trie } from '@/lib'

describe('set', () => {
  it('sets a single value', () => {
    const it = new Trie()
    it.set('x', 1)
    expect(it.size).toBe(1)
    expect(it.get('x')).toBe(1)
  })

  it('overwrites existing value without increasing size', () => {
    const it = new Trie()
    it.set('x', 1)
    it.set('x', 2)
    expect(it.size).toBe(1)
    expect(it.get('x')).toBe(2)
  })

  it('accepts constructor entries', () => {
    const it = new Trie([['x', 1]])
    expect(it.size).toBe(1)
    expect(it.get('x')).toBe(1)
  })

  it('accepts multiple constructor entries', () => {
    const it = new Trie([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ])
    expect(it.size).toBe(3)
    expect(it.get('a')).toBe(1)
    expect(it.get('b')).toBe(2)
    expect(it.get('c')).toBe(3)
  })
})
