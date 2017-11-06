# Triematch.js Changelog

Notable changes only

### 2.0.0

It's basically a `Map` with `match` additional method now

- Rewrite lib (extend API from `Map`)
- Add node 7, 8 and 9 to travis
- Update devDeps
- Update tests

### 1.1.2 (current)

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
