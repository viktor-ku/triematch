import { it, expect } from 'vitest'
import { Trie } from '@/Trie'

it('sets a single value', () => {
  const it = new Trie()
  it.set('x', 1)
  expect(it.size).toBe(1)
  expect(it.get('x')).toBe(1)
})

it('accepts constructor entries', () => {
  const it = new Trie([[ 'x', 1 ]])
  expect(it.size).toBe(1)
  expect(it.get('x')).toBe(1)
})


