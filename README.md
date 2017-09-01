# Triematch.js

> Fast Trie structure implementation with matching feature

```bash
npm install triematch
```

- [Features](#features)
- [Roadmap](#roadmap)
- [Changelog](#changelog)
- [Benchmarks](#benchmarks)
- [How its working](#how-its-working)
- [Get Started](#get-started)
- [License](#license)

## Features

-   Very fast `get` and `match` (aka matching) functions
-   Straightforward `API`
-   No dependencies
-   Very tiny
-   Browser compatible (via e.g. `webpack`)

## Roadmap

-   Add `Array` specific methods like maybe `pop`, `shift`, `forEach`, etc.
-   Performance improvements by hacking stuff
-   Compare `triematch` with something similar

## Changelog

Checkout [changelog](CHANGELOG.md)

## How its working

I call it `Store` because it is essentially a store like `Map` or `Set` but its algorithm is different. Basically it stores each char in a separate node that has reference to the next node with char and so on and so forth. In addition to that it has table with keys pointing to the nodes with values so something like `get` function happens to perform as fast as getting property of the plain `Object`.

## Get started

```js
const Store = require('triematch')
const store = new Store()
```

Then we can add things to the store

```js
store.set('Michael Joseph', '#8')
store.set('Michael Jones', 888)
store.set('Michael Joneson', { score: 512 })
store.set('Michael Jacobs', [5, 5, 4, 7])
store.set('Michael Jackson', () => 'Moonwalk')
```

We can use `get` function to get exactly that item that was inserted by
this `key` before

```js
assert(store.get('Michael Joseph') === '#8')
assert(store.get('Michael Jones') === 888)
assert(store.get('Michael Joneson').score === 512)
assert.deepEqual(store.get('Michael Jacobs'), [5, 5, 4, 7])
assert(store.get('Michael Jackson')() === 'Moonwalk')
assert(store.get('Michael') === null)
```

Or we can use `match` function which is similar to the `String.prototype.match` but in a way that it uses `Trie` structure to get every possible thing that has `query`

```js
assert(store.match('M').length === 5)
assert(store.match('Michael').length === 5)
assert(store.match('Michael Jones').length === 2) // Jones and Joneson

// As a result there will be at least empty array anyway
assert(Array.isArray(store.match(null)))
assert(store.match('foo').length === 0)
```

## License

[MIT License](LICENSE.md)
