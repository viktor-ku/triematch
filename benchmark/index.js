'use strict'

const fs = require('fs')
const path = require('path')
const runBenchmarks = require('./lib/runBenchmarks')
const list = fs.readdirSync(__dirname).sort()

main()

async function main () {
  for (let n = 0, len = list.length; n < len; n++) {
    const file = list[n]

    if (file.match(/index.js|lib/g)) {
      continue
    }

    const benchmarks = require(path.join(__dirname, file))

    if (!Array.isArray(benchmarks)) {
      continue
    }

    await runBenchmarks(benchmarks)
  }
}
