import { describe, expect, it } from 'vitest'
import { Trie } from '@/lib'

describe('README Examples', () => {
  describe('Basic Operations', () => {
    it('should work as shown in README', () => {
      // Create a new trie
      const trie = new Trie<string>()

      // Set values
      trie.set('apple', 'fruit')
      trie.set('apricot', 'fruit')
      trie.set('banana', 'fruit')
      trie.set('application', 'software')

      // Get exact value
      expect(trie.get('apple')).toBe('fruit')

      // Find all values with a prefix
      const appMatches = trie.match('app')
      expect(appMatches).toContain('fruit')
      expect(appMatches).toContain('software')
      expect(appMatches.length).toBe(2) // matches 'apple' and 'application'

      const aMatches = trie.match('a')
      expect(aMatches).toContain('fruit')
      expect(aMatches).toContain('software')
      expect(aMatches.length).toBe(3) // matches 'apple', 'apricot', 'application'

      const banMatches = trie.match('ban')
      expect(banMatches).toEqual(['fruit'])
    })
  })

  describe('Prefix Matching (Autocomplete)', () => {
    it('should work as shown in README', () => {
      const trie = new Trie<{ id: number; name: string }>()

      trie.set('michael', { id: 1, name: 'Michael' })
      trie.set('mike', { id: 2, name: 'Mike' })
      trie.set('miles', { id: 3, name: 'Miles' })
      trie.set('mickey', { id: 4, name: 'Mickey' })

      // Find all names starting with 'mi'
      const results = trie.match('mi')
      expect(results).toHaveLength(4)
      expect(results).toContainEqual({ id: 1, name: 'Michael' })
      expect(results).toContainEqual({ id: 2, name: 'Mike' })
      expect(results).toContainEqual({ id: 3, name: 'Miles' })
      expect(results).toContainEqual({ id: 4, name: 'Mickey' })

      // Limit results
      const limited = trie.match('mi', 2)
      expect(limited.length).toBe(2)
      expect(limited.length).toBeLessThanOrEqual(2)
    })
  })

  describe('Initialize with Data', () => {
    it('should work as shown in README', () => {
      const trie = new Trie([
        ['apple', 'fruit'],
        ['apricot', 'fruit'],
        ['banana', 'fruit'],
      ])

      expect(trie.size).toBe(3)
      expect(trie.get('apple')).toBe('fruit')
      expect(trie.get('apricot')).toBe('fruit')
      expect(trie.get('banana')).toBe('fruit')
    })
  })

  describe('Delete Operations', () => {
    it('should work as shown in README', () => {
      const trie = new Trie<number>()

      trie.set('ab', 1)
      trie.set('abc', 2)
      trie.set('abcd', 3)

      // Delete a node
      expect(trie.delete('ab')).toBe(true)
      expect(trie.get('ab')).toBeUndefined()
      expect(trie.get('abc')).toBe(2) // still exists

      // Clear all entries
      trie.clear()
      expect(trie.size).toBe(0)
    })
  })

  describe('Using with Complex Types', () => {
    it('should work as shown in README', () => {
      interface User {
        id: number
        email: string
        name: string
      }

      const userTrie = new Trie<User>()

      userTrie.set('john@example.com', {
        id: 1,
        email: 'john@example.com',
        name: 'John Doe',
      })

      userTrie.set('jane@example.com', {
        id: 2,
        email: 'jane@example.com',
        name: 'Jane Smith',
      })

      // Search users by email prefix
      const johnResults = userTrie.match('john')
      // [{ id: 1, email: 'john@example.com', name: 'John Doe' }]
      expect(johnResults).toHaveLength(1)
      expect(johnResults).toEqual([
        {
          id: 1,
          email: 'john@example.com',
          name: 'John Doe',
        },
      ])

      // Test jane prefix
      const janeResults = userTrie.match('jane')
      expect(janeResults).toHaveLength(1)
      expect(janeResults[0]).toEqual({
        id: 2,
        email: 'jane@example.com',
        name: 'Jane Smith',
      })
    })
  })

  describe('Map-like Interface', () => {
    it('should work as shown in README', () => {
      const trie = new Trie<string>()

      trie.set('key1', 'value1')
      trie.set('key2', 'value2')

      expect(trie.size).toBe(2)
      expect(trie.has('key1')).toBe(true) // inherited from Map

      // Iterate over keys and get values
      const entries: Array<[string, string]> = []
      for (const key of trie.keys()) {
        const value = trie.get(key)
        if (value !== undefined) {
          entries.push([key, value])
        }
      }
      expect(entries).toContainEqual(['key1', 'value1'])
      expect(entries).toContainEqual(['key2', 'value2'])
      expect(entries.length).toBe(2)
    })
  })

  describe('API Reference Examples', () => {
    describe('constructor', () => {
      it('should work as shown in README', () => {
        const trie = new Trie<string>()
        expect(trie.size).toBe(0)

        const trieWithData = new Trie([
          ['key1', 'value1'],
          ['key2', 'value2'],
        ])
        expect(trieWithData.size).toBe(2)
        expect(trieWithData.get('key1')).toBe('value1')
        expect(trieWithData.get('key2')).toBe('value2')
      })
    })

    describe('get', () => {
      it('should work as shown in README', () => {
        const trie = new Trie<string>()
        trie.set('apple', 'fruit')

        const result = trie.get('apple')
        expect(result).toBe('fruit')

        const missing = trie.get('missing')
        expect(missing).toBeUndefined()
      })
    })

    describe('set', () => {
      it('should work as shown in README', () => {
        const trie = new Trie<string>()

        trie.set('apple', 'fruit')
        expect(trie.get('apple')).toBe('fruit')

        trie.set('apple', 'red fruit') // Overwrites previous value
        expect(trie.get('apple')).toBe('red fruit')
        expect(trie.size).toBe(1) // Size doesn't increase
      })
    })

    describe('match', () => {
      it('should work as shown in README', () => {
        const trie = new Trie<string>()
        trie.set('apple', 'fruit1')
        trie.set('application', 'software')
        trie.set('apply', 'verb')

        // Returns all values with keys starting with 'app'
        const appMatches = trie.match('app')
        expect(appMatches.length).toBe(3)
        expect(appMatches).toContain('fruit1') // apple
        expect(appMatches).toContain('software') // application
        expect(appMatches).toContain('verb') // apply

        // Returns at most 5 results
        const limited = trie.match('app', 5)
        expect(limited.length).toBeLessThanOrEqual(5)

        // Returns at most 2 results
        const limited2 = trie.match('app', 2)
        expect(limited2.length).toBe(2)

        // Returns empty array
        const empty = trie.match('')
        expect(empty).toEqual([])
      })
    })

    describe('delete', () => {
      it('should work as shown in README', () => {
        const trie = new Trie<string>()
        trie.set('apple', 'fruit')

        // Returns true if deleted
        expect(trie.delete('apple')).toBe(true)
        expect(trie.get('apple')).toBeUndefined()

        // Returns false if not found
        expect(trie.delete('missing')).toBe(false)
      })
    })

    describe('clear', () => {
      it('should work as shown in README', () => {
        const trie = new Trie<string>()
        trie.set('apple', 'fruit')
        trie.set('banana', 'fruit')

        expect(trie.size).toBe(2)
        trie.clear()
        expect(trie.size).toBe(0)
        expect(trie.get('apple')).toBeUndefined()
      })
    })

    describe('Inherited from Map', () => {
      it('should have size property', () => {
        const trie = new Trie<string>()
        expect(trie.size).toBe(0)

        trie.set('key1', 'value1')
        expect(trie.size).toBe(1)

        trie.set('key2', 'value2')
        expect(trie.size).toBe(2)
      })

      it('should have has method', () => {
        const trie = new Trie<string>()
        trie.set('key1', 'value1')

        expect(trie.has('key1')).toBe(true)
        expect(trie.has('missing')).toBe(false)
      })

      it('should allow iteration with keys()', () => {
        const trie = new Trie<string>()
        trie.set('key1', 'value1')
        trie.set('key2', 'value2')

        const entries: Array<[string, string]> = []
        for (const key of trie.keys()) {
          const value = trie.get(key)
          if (value !== undefined) {
            entries.push([key, value])
          }
        }

        expect(entries.length).toBe(2)
        expect(entries).toContainEqual(['key1', 'value1'])
        expect(entries).toContainEqual(['key2', 'value2'])
      })
    })
  })
})

