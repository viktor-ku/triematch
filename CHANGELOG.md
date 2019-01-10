# Triematch.js Changelog

Notable changes only

### 3.0.0

- Refactor to use Typescript
- Use Map for `rootSocket`

### 2.0.2

- Write an actual key-value pair to the store in `new`
- Avoid filling in the internal store twice on `new`

### 2.0.0

It's basically a `Map` with `match` additional method now

- Rewrite lib (extend API from `Map`)
- Add node 7, 8 and 9 to travis
- Update devDeps
- Update tests

### 1.1.2

- Fix an issue when after removing a node the table was pointing to the empty node
- Add `node:4` to the travis
- Update `devDeps`
- Remove `microtime` so installing `devDeps` should now be just fine

### 1.1.1

- Move `microtime` which is a dev dependency over to a `devDependencies` from `optionalDependencies`

### 1.1.0

- Add benchmarks
- Add docs at [kuroljov.github.io/triematch](https://kuroljov.github.io/triematch)
- Remove `toJSON` function as it is simply just `JSON.stringify` applied to `toObject` which is not useful
