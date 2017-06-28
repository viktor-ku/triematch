// @flow
'use strict'

const createFile = require('./createFile')
const makeBar = require('./bar')

type args = {
  name: string,
  benchmarks: Array<Function>,
  state: Object,
  total?: number,
  table?: Array<string>,
  bar?: Object
}

async function runBenchmark (args: args) {
  const benchmarksLen = args.benchmarks.length
  const total: number = args.total || benchmarksLen

  const bar = args.bar || makeBar(total)

  bar.tick(0)

  for (let n = 0; n < benchmarksLen; n++) {
    await args.benchmarks[n]()
    bar.tick()
  }

  if (args.table) {
    console.log(args.table.toString())
  }

  createFile({ name: args.name, state: args.state })
}

module.exports = runBenchmark
