// @flow
'use strict'

const Progress = require('progress')
const { bgWhite } = require('chalk')

module.exports = (total: number) => {
  return new Progress('(:bar) Done :current of :total', {
    total,
    clear: true,
    complete: bgWhite(' '),
    incomplete: '  '
  })
}
