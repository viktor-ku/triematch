import { describe, it, expect } from 'vitest'
import { Trie } from '@/Trie'

describe('delete', () => {
  it('does nothing if key missing', () => {
    const it = new Trie()
    it.set('foo', 1)
    const res = it.delete('bar')
    expect(res).toBe(false)
    expect(it.size).toBe(1)
    expect(it.match('f')).toEqual([1])
  })

  it('deletes exactly one item', () => {
    const it = new Trie()
    it.set('ab', 1)
    const res = it.delete('ab')
    expect(res).toBe(true)
    expect(it.size).toBe(0)
    expect(it.get('ab')).toBeUndefined()
    expect(it.match('a')).toEqual([])
  })

  it('deletes node in the same branch', () => {
    const it = new Trie()
    it.set('ab', 1)
    it.set('abc', 2)
    const res = it.delete('ab')
    expect(res).toBe(true)
    expect(it.get('ab')).toBeUndefined()
    expect(it.get('abc')).toBe(2)
    expect(it.match('a')).toEqual([2])
  })

  it('deletes leaf in the same branch', () => {
    const it = new Trie()
    it.set('ab', 1)
    it.set('abc', 2)
    const res = it.delete('abc')
    expect(res).toBe(true)
    expect(it.get('ab')).toBe(1)
    expect(it.get('abc')).toBeUndefined()
    expect(it.match('a')).toEqual([1])
  })

  it('deletes fork root', () => {
    const it = new Trie()
    it.set('a', 1)
    it.set('ab', 2)
    it.set('abc', 3)
    const res = it.delete('a')
    expect(res).toBe(true)
    expect(it.get('a')).toBeUndefined()
    expect(it.get('ab')).toBe(2)
    expect(it.get('abc')).toBe(3)
    expect(it.match('a')).toEqual([2, 3])
  })

  it('deletes node after fork', () => {
    const it = new Trie()
    it.set('a', 1)
    it.set('ab', 2)
    it.set('abc', 3)
    const res = it.delete('ab')
    expect(res).toBe(true)
    expect(it.get('a')).toBe(1)
    expect(it.get('ab')).toBeUndefined()
    expect(it.get('abc')).toBe(3)
    expect(it.match('a')).toEqual([1, 3])
  })
})


