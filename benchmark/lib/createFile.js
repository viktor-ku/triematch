// @flow
'use strict'

const fs = require('fs')
const path = require('path')

function createFile (filename: string, state: Object) {
  const dir = path.resolve(__dirname, '../', 'results')
  const content = JSON.stringify(state[path.basename(filename, '.json')], null, 2)
  const filepath = path.join(dir, filename)

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  fs.writeFileSync(filepath, content)
}

module.exports = createFile
