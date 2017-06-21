'use strict'

const faker = require('faker')

module.exports = () => {
  return {
    name: faker.name.findName(),
    job: faker.name.jobTitle(),
    id: faker.random.uuid()
  }
}
