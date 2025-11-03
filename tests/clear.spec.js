import { it, expect } from 'vitest'
import { Trie } from '@/Trie'

it('clears state', () => {
    const it = new Trie()
    it.set('A', 1)
    it.set('B', 2)
    expect(it.size).toBe(2)
    it.clear()
    expect(it.size).toBe(0)
})


