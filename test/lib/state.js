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

const state = {
  _state: Array(names.length).fill().map((_, i) => ({
    id: i + 1,
    name: names[i]
  })),
  toObject () {
    const obj = {}
    this._state.forEach(x => {
      obj[x.name] = x
    })
    return obj
  },
  toArray () {
    return this._state
  }
}

function feed (store: Object, state: Array<Object>): void {
  return state.forEach(x => store.set(x.name, x))
}

module.exports = {
  state,
  feed,
  names,
  Michael,
  MichaelJoseph,
  MichaelJones,
  MichaelJoneson,
  MichaelJimenez,
  MichaelJensen,
  MichaelJackson,
  MichaelJacobs
}
