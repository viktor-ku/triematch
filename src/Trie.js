// @flow
'use strict'

const Node = require('./Node')
const getClosestNode = require('./getClosestNode')

/**
  Trie class
  @name Trie
  @example const store = new Trie()
*/
class Trie {
  rootSocket: Object
  table: Map<string, any>

  constructor () {
    this.rootSocket = {}
    this.table = new Map()
  }

  /**
    Get exact one value like e.g. `Map` does
    @example store.get('Michael')
  */
  get (query: string): any {
    const node: Node | void = this.table.get(query)
    return node && node.value
  }

  /**
   Executes a provided function once per each key/value pair
   @example store.forEach((value, key, table) => console.log(key, '=>', value))
  */
  forEach (callback: (value: any, key: string, table: Map<string, any>) => any): void {
    if (!callback) {
      return
    }

    const table = this.table

    for (const pair: [string, Node] of table) {
      const key = pair[0]
      const value = pair[1].value

      callback(value, key, new Map(table))
    }
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
    const closestNode: Node | null = getClosestNode(this.rootSocket, query)

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

    this.table.set(key, node)
  }

  /**
    Remove value by a given key
    @example store.remove('Michael Jacobs')
  */
  delete (query: string): void {
    const end: Node | void = this.table.get(query)

    if (!end) {
      return
    }

    const endSockets: number = Object.keys(end.socket).length

    if (endSockets) {
      delete end.name
      delete end.value
      this.table.delete(query)
      return
    }

    let node = new Node({ socket: this.rootSocket })
    let point: Object | void

    for (let n = 0, len = query.length; n < len; n++) {
      const char: string = query[n]

      if (!node.socket[char]) {
        return
      }

      if (node.name || Object.keys(node.socket).length >= 2) {
        point = { node, char }
      }

      node = node.socket[char]
    }

    if (!point) {
      this.clear()
      return
    }

    delete point.node.socket[point.char]
    this.table.delete(query)
  }

  /**
    Reset the state after which the whole store will be empty
    @example store.reset()
  */
  clear (): void {
    this.rootSocket = {}
    this.table = new Map()
  }
}

module.exports = Trie
