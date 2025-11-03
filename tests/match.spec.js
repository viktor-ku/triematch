import { it, expect } from 'vitest'
import { Trie } from '@/Trie'

it('returns empty for no matches', () => {
  const it = new Trie()
  it.set('alpha', 1)
  expect(it.match('z')).toEqual([])
})

it('finds exact match', () => {
  const it = new Trie()
  const v = { id: 1, name: 'michael' }
  it.set('michael', v)
  expect(it.match('michael')).toEqual([v])
})

it('returns multiple by prefix', () => {
  const it = new Trie()
  it.set('mike', 1)
  it.set('miles', 2)
  it.set('mickey', 3)
  const res = it.match('mi')
  expect(res).toEqual(expect.arrayContaining([1, 2, 3]))
  expect(res).toHaveLength(3)
})


