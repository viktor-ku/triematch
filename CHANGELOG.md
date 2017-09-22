# Triematch.js Changelog

Notable changes only

### 2.0.0 (WIP)

The goal is to make this storage API as similar as possible to the `Map` API

- Add `forEach` method
- Remove `toArray`
- Remove `toObject`
- Rename `reset` to `clear`
- Rename `remove` to `delete`

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
