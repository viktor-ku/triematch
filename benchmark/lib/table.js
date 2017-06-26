// @flow
'use strict'

const Table = require('cli-table')

module.exports = new Table({
  head: [
    'name',
    '',
    'ops/sec',
    'mean (ms)',
    '±%',
    'samples'
  ],
  style: {
    head: ['blue']
  }
})
