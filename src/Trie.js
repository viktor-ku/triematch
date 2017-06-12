// @flow
'use strict'

const Node = require('./Node')

/**
  Trie class
  @name Trie
  @example const store = new Trie()
*/
class Trie {
  rootSocket: Object
  table: Object

  constructor () {
    this.rootSocket = {}
    this.table = {}
  }

  /**
    Get exact one value like e.g. `Map` does
    @example store.get('Michael')
  */
  get (query: string): any | null {
    const node: Node | void = this.table[query]
    return node && node.value
  }

  /**
    Get all values matching this `query`. If `count` is greater than `0` then return that many results (it will increase searching in case you have thousands of elements). Will return all results by default
    @example store.match('Michael')
    @example store.match('John', 20)
  */
  match (query: string, count: number = 0): Array<any> {
    if (!query) {
      return []
    }

    const points: Array<Node> = []
    const result: Array<any> = []
    const closestNode: Node | null = this._getClosestNode(query)

    if (!closestNode) {
      return []
    }

    let node: Node = closestNode

    while (true) {
      if (count && result.length >= count) {
        break
      }

      const sockets: Array<string> = Object.keys(node.socket)
      const socketCount: number = sockets.length
      let char: string = sockets[0]

      if (node.name) {
        result.push(node.value)
      }

      if (socketCount >= 2) {
        for (let n = 1, len = sockets.length; n < len; n++) {
          points.push(node.socket[sockets[n]])
        }
      } else if (socketCount === 0) {
        const next: Node = points.pop()
        if (!next) {
          break
        }
        node = next
        continue
      }

      node = node.socket[char]
    }

    return result
  }

  /**
    Add value
    @example store.set('Michael Jackson', { id: 1 })
    @example store.set('Lord Kelvin', 1824)
    @example store.set('William Osler', 'Scientist')
    @example store.set('Anton Webern', [])
    @example store.set('Charles Best', function info () {})
  */
  set (key: string, value: any): void {
    if (!key) {
      return
    }

    let node = new Node({ socket: this.rootSocket })

    for (let n = 0, len = key.length; n < len; n++) {
      const char: string = key[n]

      if (!node.socket[char]) {
        node.socket[char] = new Node()
      }

      node = node.socket[char]
    }

    node.name = key
    node.value = value
    this.table[key] = node
  }

  /**
    Remove value by a given key
    @example store.remove('Michael Jacobs')
  */
  remove (query: string): void {
    const end: Node = this.table[query]

    if (!end) {
      return
    }

    const endSockets = Object.keys(end.socket)

    if (endSockets.length) {
      // has children
      delete end.name
      delete end.value
      return
    }

    let node: Node = new Node({ socket: this.rootSocket })
    const way = []

    for (let n = 0, len = query.length; n < len; n++) {
      const char: string = query[n]
      const socket: Object = node.socket
      const nextNode: Node = socket[char]

      if (!nextNode) {
        return
      }

      if (Object.keys(socket).length >= 2) {
        way.push([node, char])
      }

      node = node.socket[char]
    }

    let pNode = way.pop()

    if (pNode[0] === node) {
      pNode = way.pop()
    }

    delete pNode[0].socket[pNode[1]]
    delete this.table[query]
  }

  /**
    Reset the state after which the whole store will be empty
    @example store.reset()
  */
  reset (): void {
    this.rootSocket = {}
    this.table = {}
  }

  /**
    Return the key - value representation of the state
    @example store.toObject()
  */
  toObject (): Object {
    const obj = {}
    const keys = Object.keys(this.table)

    for (let n = 0, len = keys.length; n < len; n++) {
      const key = keys[n]
      const value = this.table[key].value
      obj[key] = value
    }

    return obj
  }

  /**
    Return array with just values
    @example store.toArray()
  */
  toArray (): Array<any> {
    const arr = []
    const keys = Object.keys(this.table)

    for (let n = 0, len = keys.length; n < len; n++) {
      arr.push(this.table[keys[n]].value)
    }

    return arr
  }

  /**
    Return state converted to the JSON
    @example store.toJSON()
  */
  toJSON (): string {
    return JSON.stringify(this.toObject())
  }

  _getClosestNode (query: string): Node | null {
    let node: Node = new Node({ socket: this.rootSocket })

    for (let n = 0, len = query.length; n < len; n++) {
      const char = query[n]

      if (!node.socket[char]) {
        return null
      }

      node = node.socket[char]
    }

    return node
  }
}

module.exports = Trie
