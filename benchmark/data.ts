import * as faker from 'faker'
import * as fs from 'fs'
import * as path from 'path'

const limit = 100_000
const names = new Array(limit)
let n = 0

while (n < limit) {
  const name = faker.name.findName()
  const city = faker.address.city()

  const record = [name, {
    id: n,
    name,
    from: city,
  }]

  names[n] = record

  n += 1
}

const datapath = path.join(__dirname, 'data', `d${limit}.json`)
fs.writeFileSync(datapath, JSON.stringify(names, null, 2))
