// @flow
'use strict'

const onStart = (spinner: Object) => (e: Object) => {
  spinner.start(e.target.name)
}

module.exports = onStart
