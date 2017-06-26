// @flow
'use strict'

const fs = require('fs')
const path = require('path')
const runBenchmarks = require('./lib/runBenchmarks')
const makeBar = require('./lib/bar')
const table = require('./lib/table')
const state = require('./lib/state')

const list = fs.readdirSync(__dirname).sort()

main()

async function main () {
  const totalBenchmarks = []
  let total = 0

  for (let n = 0, len = list.length; n < len; n++) {
    const filename = path.basename(list[n], '.js')

    if (filename.match(/index|lib|results/g)) {
      continue
    }

    const benchmark = require(path.join(__dirname, filename))

    totalBenchmarks.push(benchmark)
    total += benchmark.benchmarks.length
  }

  const bar = makeBar(total)

  for (let n = 0, len = totalBenchmarks.length; n < len; n++) {
    const { name, benchmarks } = totalBenchmarks[n]

    await runBenchmarks({
      name,
      benchmarks,
      state,
      total,
      bar
    })
  }

  console.log(table.toString())
}
