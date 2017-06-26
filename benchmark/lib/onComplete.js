// @flow
'use strict'

const { yellow } = require('chalk')
const { formatNumber } = require('benchmark')
const state = require('./state')
const table = require('./table')

const onComplete = (e: Object) => {
  const bench = e.target
  const stats = {
    name: bench.name,
    id: bench.id,
    hz: {
      value: bench.hz,
      label: 'ops/sec'
    },
    rme: {
      value: bench.stats.rme,
      label: '±%'
    },
    elapsed: {
      value: bench.times.elapsed,
      label: 'seconds'
    },
    samples: {
      value: bench.stats.sample.length,
      label: 'runs sampled'
    },
    mean: {
      value: bench.stats.mean * 1000,
      label: 'ms'
    }
  }

  table.push([
    yellow(stats.name),
    stats.id,
    formatNumber(parseInt(stats.hz.value, 10)),
    stats.mean.value.toFixed(10),
    stats.rme.value.toFixed(2),
    stats.samples.value
  ])

  if (!state[stats.name]) {
    state[stats.name] = []
  }

  state[stats.name].push(stats)
}

module.exports = onComplete
