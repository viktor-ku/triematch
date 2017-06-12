// @flow
'use strict'

class Node {
  socket: Object
  value: Object
  name: string

  constructor (args?: { socket?: Object } = {}) {
    this.socket = args.socket || {}
  }
}

module.exports = Node
