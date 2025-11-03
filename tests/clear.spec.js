import { describe, it, expect } from 'vitest'
import { Trie } from '@/lib'

describe('clear', () => {
  it('clears state', () => {
    const it = new Trie()
    it.set('A', 1)
    it.set('B', 2)
    expect(it.size).toBe(2)
    it.clear()
    expect(it.size).toBe(0)
  })

  it('after clear, match returns empty', () => {
    const it = new Trie()
    it.set('A', 1)
    it.set('AB', 2)
    it.clear()
    expect(it.match('A')).toEqual([])
  })
})


