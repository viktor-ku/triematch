import { describe, it, expect } from 'vitest'
import { Trie } from '@/Trie'

interface Person { id: number; name: string }

describe('types', () => {
    it('uses Trie APIs with typed values', () => {
        const it = new Trie<Person>([['alpha', { id: 1, name: 'alpha' }]])

        // set
        it.set('beta', { id: 2, name: 'beta' })

        // get
        const a: Person | undefined = it.get('alpha')
        if (a) {
            expect(a.id).toBe(1)
            expect(a.name).toBe('alpha')
        }

        // match (all)
        const matches: Person[] = it.match('b')
        expect(matches).toHaveLength(1)
        expect(matches[0]).toStrictEqual({ id: 2, name: 'beta' })

        // match (limited)
        const limited: Person[] = it.match('a', 1)
        expect(limited.length).toBeGreaterThanOrEqual(0)

        // delete
        const deleted: boolean = it.delete('beta')
        expect(deleted).toBe(true)

        // clear
        it.clear()
        expect(it.size).toBe(0)
    })
})


