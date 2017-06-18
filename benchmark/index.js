// @flow
'use strict'

const fs = require('fs')
const path = require('path')

const list = fs
  .readdirSync(__dirname)
  .filter(x => x !== 'index.js')
  .filter(x => x !== 'lib')
  .sort()
  .map(name => require(path.resolve(__dirname, name)))

list
  .forEach((benchmark, i) => {
    const nextBenchmark = list[i + 1]

    if (nextBenchmark) {
      benchmark.on('complete', () => nextBenchmark.run())
    }
  })

list[0].run()
