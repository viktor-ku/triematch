# Triematch.js

> Fast Trie structure implementation with matching feature. Best suited for autocompletion!

```bash
npm install triematch
```

- [Features](#features)
- [Changelog](#changelog)
- [How it works](#how-it-works)
- [Get Started](#get-started)
- [License](#license)

## Features

-   Very fast `get` and `match` (aka matching) functions
-   Straightforward `API` based on `Map`
-   No dependencies
-   Very tiny
-   Browser compatible (via e.g. `webpack`)

## Changelog

Checkout [changelog](CHANGELOG.md)

## How it works

I call it `Store` because it is essentially a store like `Map` but its algorithm is different. Basically it stores each char in a separate node that has reference to the next node with char and so on and so forth. In addition to that it has table with keys pointing to the nodes with values so something like `get` function happens to perform as fast as getting property of the plain `Object`.

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

You can use `match` function which is similar to the `String.prototype.match` but in a way that it uses `Trie` structure to get every possible item that matches `query`

```js
assert(store.match('M').length === 5)
assert(store.match('Michael').length === 5)
assert(store.match('Michael Jones').length === 2) // Jones and Joneson

// As a result there will be at least empty array anyway
assert(store.match('foo').length === 0)
```

Or you can use plain old `get` function to get exactly that item that was inserted by
this `key` before

```js
assert(store.get('Michael Joseph') === '#8')
assert(store.get('Michael Jones') === 888)
assert(store.get('Michael Joneson').score === 512)
assert.deepEqual(store.get('Michael Jacobs'), [5, 5, 4, 7])
assert(store.get('Michael Jackson')() === 'Moonwalk')
assert(store.get('Michael') === null)
```

## License

[MIT License](LICENSE.md)
