'use strict'

const fs = require('fs')
const path = require('path')
const faker = require('faker')

const state = []
let size = Number(process.argv[2])
const filename = process.argv[3]

if (isNaN(size)) {
  throw new Error('size is expected')
}

if (!filename) {
  throw new Error('filename is expected')
}

const filepath = path.join(__dirname, filename)

while (size--) {
  const number = faker.phone.phoneNumber('###-###-####')
  const name = faker.name.findName()
  state.push({ name, number })
}

fs.writeFileSync(filepath, JSON.stringify(state))
