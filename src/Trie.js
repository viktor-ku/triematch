// @flow
'use strict'

const Node = require('./Node')
const getClosestNode = require('./getClosestNode')

/**
  Trie class
  @name Trie
  @example const store = new Trie(new Map())
*/
class Trie extends Map {
  rootSocket: Object

  constructor (args?: any) {
    super()
    this.rootSocket = {}

    if (Array.isArray(args)) {
      for (const [key, value] of args) {
        this.set(key, value)
      }
    }
  }

  /**
    Returns the value associated to the key, or undefined if there is none

    @example store.get('Michael')
  */
  get (query: string): any {
    const node: Node | void = super.get(query)
    return node && node.value
  }

  /**
    Get all values matching this `query`. If `count` is greater than `0` then return that many results (it will increase searching in case you have thousands of elements). Will return all results by default

    @example store.match('Michael')
    @example store.match('John', 20)
  */
  match (query: string, count?: number): Array<any> {
    if (!query) {
      return []
    }

    const points: Array<Node> = []
    const result: Array<any> = []
    const closestNode: Node | void = getClosestNode(this.rootSocket, query)

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
      const char: string = sockets[0]

      if (node.key) {
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
    Sets the value for the key in the Trie object. Return Map object

    @example store.set('Michael Jackson', { id: 1 })
    @example store.set('Lord Kelvin', 1824)
    @example store.set('William Osler', 'Scientist')
    @example store.set('Anton Webern', [])
    @example store.set('Charles Best', function info () {})
  */
  set (key: string, value: any): Map {
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

    node.key = key
    node.value = value

    return super.set(key, node)
  }

  /**
    Returns true if an element in the Map object existed and has been removed, or false if the element does not exist.

    @example store.delete('Michael Jacobs')
  */
  delete (query: string): boolean {
    const end: Node | void = super.get(query)

    if (!end) {
      return false
    }

    const endSockets: number = Object.keys(end.socket).length

    if (endSockets) {
      delete end.key
      delete end.value
      super.delete(query)
      return true
    }

    let node = new Node({ socket: this.rootSocket })

    let point: Object | void
    for (let n = 0, len = query.length; n < len; n++) {
      const char: string = query[n]

      if (!node.socket[char]) {
        return true
      }

      if (node.key || Object.keys(node.socket).length >= 2) {
        point = { node, char }
      }

      node = node.socket[char]
    }

    if (!point) {
      this.clear()
      return true
    }

    delete point.node.socket[point.char]
    super.delete(query)
    return true
  }

  /**
    Removes all key/value pairs from the Trie object
    @example store.clear()
  */
  clear (): void {
    this.rootSocket = {}
    super.clear()
  }
}

module.exports = Trie
