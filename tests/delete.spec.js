import { it, expect } from 'vitest'
import { Trie } from '@/Trie'

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
  it.delete('ab')
  expect(it.size).toBe(0)
  expect(it.get('ab')).toBeUndefined()
  expect(it.match('a')).toEqual([])
})

it('deletes node in the same branch', () => {
  const it = new Trie()
  it.set('ab', 1)
  it.set('abc', 2)
  it.delete('ab')
  expect(it.get('ab')).toBeUndefined()
  expect(it.get('abc')).toBe(2)
  expect(it.match('a')).toEqual([2])
})

it('deletes leaf in the same branch', () => {
  const it = new Trie()
  it.set('ab', 1)
  it.set('abc', 2)
  it.delete('abc')
  expect(it.get('ab')).toBe(1)
  expect(it.get('abc')).toBeUndefined()
  expect(it.match('a')).toEqual([1])
})

it('deletes fork root', () => {
  const it = new Trie()
  it.set('a', 1)
  it.set('ab', 2)
  it.set('abc', 3)
  it.delete('a')
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
  it.delete('ab')
  expect(it.get('a')).toBe(1)
  expect(it.get('ab')).toBeUndefined()
  expect(it.get('abc')).toBe(3)
  expect(it.match('a')).toEqual([1, 3])
})


