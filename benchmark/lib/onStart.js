// @flow
'use strict'

const onStart = (spinner: Object) => (e: Object) => {
  spinner.start(`Benchmarking ${e.target.name}`)
}

module.exports = onStart
