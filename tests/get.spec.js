import { it, expect } from 'vitest'
import { Trie } from '@/Trie'

it('returns undefined for missing/invalid keys', () => {
  const it = new Trie()
  expect(it.get('missing')).toBeUndefined()
  // invalid values should be safely handled
  expect(it.get(null)).toBeUndefined()
  expect(it.get()).toBeUndefined()
  expect(it.get(undefined)).toBeUndefined()
})

it('returns stored values', () => {
  const it = new Trie()
  it.set('foo', { id: 1, name: 'foo' })
  it.set('bar', { id: 2, name: 'bar' })
  expect(it.get('foo')).toEqual({ id: 1, name: 'foo' })
  expect(it.get('bar')).toEqual({ id: 2, name: 'bar' })
})


