// @flow
'use strict'

const Michael = 'Michael'
const MichaelJoseph = 'Michael Joseph'
const MichaelJones = 'Michael Jones'
const MichaelJoneson = 'Michael Joneson'
const MichaelJimenez = 'Michael Jimenez'
const MichaelJensen = 'Michael Jensen'
const MichaelJackson = 'Michael Jackson'
const MichaelJacobs = 'Michael Jacobs'

const names: Array<string> = [
  Michael,
  MichaelJoseph,
  MichaelJones,
  MichaelJoneson,
  MichaelJimenez,
  MichaelJensen,
  MichaelJackson,
  MichaelJacobs
]

const state: Map<string, Object> = new Map()

names.forEach((name: string, i: number) => state.set(name, {
  id: i + 1,
  name
}))

function feed (store: Object): void {
  return state.forEach(x => store.set(x.name, x))
}

module.exports = {
  state,
  feed,
  Michael,
  MichaelJoseph,
  MichaelJones,
  MichaelJoneson,
  MichaelJimenez,
  MichaelJensen,
  MichaelJackson,
  MichaelJacobs
}
