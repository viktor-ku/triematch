// @flow
'use strict'

const fs = require('fs')
const path = require('path')

type args = {
  name: string,
  state: Object
}

function createFile ({ name, state }: args) {
  const dir = path.resolve(__dirname, '../', 'results')
  const filename = `${name}.json`
  const filepath = path.join(dir, filename)
  const content = JSON.stringify({
    meta: state.meta,
    benchmarks: state[name]
  }, null, 2)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  fs.writeFileSync(filepath, content)
}

module.exports = createFile
