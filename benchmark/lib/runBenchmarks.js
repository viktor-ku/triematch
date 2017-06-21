// @flow
'use strict'

async function runBenchmarks (benchmarks: Array<Function>) {
  for (let n = 0, len = benchmarks.length; n < len; n++) {
    await benchmarks[n]()
  }
}

module.exports = runBenchmarks
