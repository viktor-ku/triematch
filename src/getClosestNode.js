// @flow
'use strict'

const Node = require('./Node')

module.exports = function getClosestNode (socket: Object, query: string): Node | void {
  let node: Node = new Node({ socket })

  for (let n = 0, len = query.length; n < len; n++) {
    const char: string = query[n]

    if (!node.socket[char]) {
      return
    }

    node = node.socket[char]
  }

  return node
}
