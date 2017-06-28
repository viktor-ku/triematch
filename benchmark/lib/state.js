// @flow
'use strict'

const os = require('os')
const crypto = require('crypto')
const pkg = require('../../package.json')

const cpus = os.cpus()
const model = cpus[0].model
const cpusCount = cpus.length
const totalmem = (os.totalmem() / 1073741824).toFixed(2)

module.exports = {
  meta: {
    cpu: `${cpusCount} x ${model}`,
    arch: `${os.type()} ${os.arch()}`,
    totalmem: `${totalmem}Gb`,
    benchmarkId: crypto.randomBytes(8).toString('hex'),
    date: Date(),
    version: pkg.version,
    versions: process.versions
  }
}
