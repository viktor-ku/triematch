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
  cache: Map<string, any>
  size: number

  constructor () {
    this.rootSocket = {}
    this.cache = new Map()
    this.size = 0
  }

  entries () {
    // TODO
  }

  /**
    Returns true or false depending on whether class consist such key or not

    @example store.has('Michael')
  */
  has (key: string): boolean {
    if (!key) {
      return false
    }

    const node: Node | void = this.cache.get(key)

    if (!node) {
      return false
    }
    return true
  }
  /**
    Returns a new Iterator object that contains the keys for each element of Trie

    @example store.keys()
  */
  keys (): Iterator<string> {
    const cache = this.cache
    const keys: Array<string> = []
    var index = 0

    for (const pair: [string, Node] of cache) {
      const key = pair[0]
      keys.push(key)
    }

    return {
      next: () => (index < keys.length ? {value: keys[index++], done: false} : {done: true})
    }
  }

  values () {
    // TODO
  }

  [Symbol.iterator] () {
    return {
      next: () => ({ done: true })
    }
  }

  /**
    Returns the value associated to the key, or undefined if there is none

    @example store.get('Michael')
  */
  get (query: string): any {
    const node: Node | void = this.cache.get(query)
    return node && node.value
  }

  /**
    Calls callbackFn once for each key-value pair present in the Map object, in insertion order. If a thisArg parameter is provided to forEach, it will be used as the this value for each callback

    @example store.forEach((value, key, table) => console.log(key, '=>', value))
  */
  forEach (callback: (value: any, key: string, table: Map<string, any>) => any): void {
    if (!callback) {
      return
    }

    const cache = this.cache

    for (const pair: [string, Node] of cache) {
      const key = pair[0]
      const value = pair[1].value

      callback(value, key, new Map(cache))
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
    Sets the value for the key in the Trie object. Returns the Trie object

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

    node.key = key
    node.value = value

    this.cache.set(key, node)
    this.size++
  }

  /**
    Removes any value associated to the key and returns the value that has(key) would have previously returned. has(key) will return false afterwards

    @example store.delete('Michael Jacobs')
  */
  delete (query: string): void {
    const end: Node | void = this.cache.get(query)

    if (!end) {
      return
    }

    const endSockets: number = Object.keys(end.socket).length

    if (endSockets) {
      delete end.key
      delete end.value
      this.cache.delete(query)
      return
    }

    let node = new Node({ socket: this.rootSocket })
    let point: Object | void

    for (let n = 0, len = query.length; n < len; n++) {
      const char: string = query[n]

      if (!node.socket[char]) {
        return
      }

      if (node.key || Object.keys(node.socket).length >= 2) {
        point = { node, char }
      }

      node = node.socket[char]
    }

    if (!point) {
      this.clear()
      return
    }

    delete point.node.socket[point.char]
    this.cache.delete(query)
    this.size--
  }

  /**
    Removes all key/value pairs from the Trie object
    @example store.reset()
  */
  clear (): void {
    this.rootSocket = {}
    this.cache = new Map()
    this.size = 0
  }
}

module.exports = Trie
