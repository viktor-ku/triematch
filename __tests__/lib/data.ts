const Michael = 'Michael'
const MichaelJoseph = 'Michael Joseph'
const MichaelJones = 'Michael Jones'
const MichaelJoneson = 'Michael Joneson'
const MichaelJimenez = 'Michael Jimenez'
const MichaelJensen = 'Michael Jensen'
const MichaelJackson = 'Michael Jackson'
const MichaelJacobs = 'Michael Jacobs'

const names = [
  Michael,
  MichaelJoseph,
  MichaelJones,
  MichaelJoneson,
  MichaelJimenez,
  MichaelJensen,
  MichaelJackson,
  MichaelJacobs,
]

export interface IName {
  id: number,
  name: string,
}

export type Store = Map<string, IName>

const store: Store = new Map()

names.forEach((name, i) => {
  store.set(name, {
    id: i + 1,
    name,
  })
})

function fill(s: Store) {
  store.forEach((x) => {
    s.set(x.name, x)
  })
}

export default {
  store,
  fill,
  Michael,
  MichaelJoseph,
  MichaelJones,
  MichaelJoneson,
  MichaelJimenez,
  MichaelJensen,
  MichaelJackson,
  MichaelJacobs,
}
