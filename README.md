# triematch

A fast, efficient Trie (prefix tree) data structure implementation with prefix matching capabilities. Perfect for autocomplete, search, and prefix-based lookups.

## Features

- ⚡ **Fast**: Optimized for performance with efficient prefix matching
- 🔍 **Prefix Matching**: Find all values that share a given prefix
- 📦 **TypeScript**: Full TypeScript support with generics
- 🗺️ **Map-like API**: Extends JavaScript `Map` for familiar usage
- 🧹 **Memory Efficient**: Automatic compaction on deletion
- 🌳 **Zero Dependencies**: Lightweight with no external dependencies

## Installation

```bash
npm install triematch
```

```bash
bun add triematch
```

```bash
yarn add triematch
```

## Usage

### Basic Operations

```typescript
import { Trie } from 'triematch';

// Create a new trie
const trie = new Trie<string>();

// Set values
trie.set('apple', 'fruit');
trie.set('apricot', 'fruit');
trie.set('banana', 'fruit');
trie.set('application', 'software');

// Get exact value
trie.get('apple'); // 'fruit'

// Find all values with a prefix
trie.match('app'); // ['fruit', 'software'] (matches 'apple' and 'application')
trie.match('a');   // ['fruit', 'fruit', 'software'] (matches 'apple', 'apricot', 'application')
trie.match('ban'); // ['fruit'] (matches 'banana')
```

### Prefix Matching (Autocomplete)

The `match` method is perfect for autocomplete functionality:

```typescript
const trie = new Trie<{ id: number; name: string }>();

trie.set('michael', { id: 1, name: 'Michael' });
trie.set('mike', { id: 2, name: 'Mike' });
trie.set('miles', { id: 3, name: 'Miles' });
trie.set('mickey', { id: 4, name: 'Mickey' });

// Find all names starting with 'mi'
const results = trie.match('mi');
// [
//   { id: 1, name: 'Michael' },
//   { id: 2, name: 'Mike' },
//   { id: 3, name: 'Miles' },
//   { id: 4, name: 'Mickey' }
// ]

// Limit results
const limited = trie.match('mi', 2);
// Returns at most 2 results
```

### Initialize with Data

You can initialize the trie with entries:

```typescript
const trie = new Trie([
  ['apple', 'fruit'],
  ['apricot', 'fruit'],
  ['banana', 'fruit'],
]);
```

### Delete Operations

The trie automatically compacts when deleting entries:

```typescript
const trie = new Trie<number>();

trie.set('ab', 1);
trie.set('abc', 2);
trie.set('abcd', 3);

// Delete a node
trie.delete('ab'); // Returns true
trie.get('ab');    // undefined
trie.get('abc');   // 2 (still exists)

// Clear all entries
trie.clear();
trie.size; // 0
```

### Using with Complex Types

```typescript
interface User {
  id: number;
  email: string;
  name: string;
}

const userTrie = new Trie<User>();

userTrie.set('john@example.com', {
  id: 1,
  email: 'john@example.com',
  name: 'John Doe',
});

userTrie.set('jane@example.com', {
  id: 2,
  email: 'jane@example.com',
  name: 'Jane Smith',
});

// Search users by email prefix
const johnResults = userTrie.match('john');
// [{ id: 1, email: 'john@example.com', name: 'John Doe' }]

### Map-like Interface

Since `Trie` extends `Map`, you can use standard Map methods:

```typescript
const trie = new Trie<string>();

trie.set('key1', 'value1');
trie.set('key2', 'value2');

trie.size;           // 2
trie.has('key1');    // true (inherited from Map)

// Iterate over keys and get values
for (const key of trie.keys()) {
  const value = trie.get(key);
  console.log(key, value);
}
```

## API Reference

### `constructor(entries?: Array<[string, V]>)`

Creates a new Trie instance. Optionally accepts an array of `[key, value]` pairs to initialize the trie.

```typescript
const trie = new Trie<string>();
const trieWithData = new Trie([['key1', 'value1'], ['key2', 'value2']]);
```

### `get(query: string): V | undefined`

Retrieves a value by its exact key. Returns `undefined` if the key doesn't exist.

```typescript
trie.get('apple'); // Returns the value or undefined
```

### `set(key: string, value: V): this`

Inserts or updates a value in the trie. Overwrites existing values with the same key.

```typescript
trie.set('apple', 'fruit');
trie.set('apple', 'red fruit'); // Overwrites previous value
```

### `match(query: string, count?: number): V[]`

Finds all values whose keys start with the given prefix. Returns an empty array if no matches are found.

- `query`: The prefix to search for
- `count`: Optional. Maximum number of results to return

```typescript
trie.set('apple', 'fruit1');
trie.set('application', 'software');
trie.set('apply', 'verb');
trie.match('app');        // Returns all values: ['fruit1', 'software', 'verb']
trie.match('app', 2);     // Returns at most 2 results: ['fruit1', 'software']
trie.match('');           // Returns empty array
```

### `delete(query: string): boolean`

Removes a key-value pair from the trie. The trie structure is automatically compacted to remove unused nodes. Returns `true` if the key was found and deleted, `false` otherwise.

```typescript
trie.delete('apple'); // Returns true if deleted, false if not found
```

### `clear(): void`

Removes all entries from the trie and resets it to an empty state.

```typescript
trie.clear();
```

### Inherited from Map

The `Trie` class extends JavaScript's `Map`, so you also have access to:

- `size`: The number of entries
- `has(key: string): boolean`: Check if a key exists
- `keys()`: Returns an iterator of keys (use with `get()` to access values)
- Standard Map iteration methods

Note: Since Trie stores internal Node objects in the Map, use `keys()` with `get()` for key-value iteration rather than direct Map iteration methods.

## Use Cases

- **Autocomplete**: Fast prefix-based suggestions
- **Search**: Find all items matching a search term
- **Routing**: URL or path matching
- **Phone Book**: Contact name lookup
- **Command Completion**: Terminal/shell autocomplete
- **Spell Check**: Dictionary prefix matching

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
