// @flow
'use strict'

const fs = require('fs')
const path = require('path')

require('babel-register')

fs
  .readdirSync(__dirname)
  .filter(name => name !== 'lib' && name !== 'index.js')
  .map(name => require(path.join(__dirname, name)))
