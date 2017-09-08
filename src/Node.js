// @flow
'use strict'

class Node {
  socket: Object
  value: Object
  name: string

  constructor (args?: Object) {
    args = args || {}
    this.socket = args.socket || {}
  }
}

module.exports = Node
