import { Node } from './Node'
import { Char, getClosestNode, Socket } from './utils'

type Point = [Node, Char]

export class Trie<V = any> extends Map<string, any> {
  private rootSocket: Socket = new Map()

  constructor(arr?: Array<[string, V]>) {
    super()

    if (Array.isArray(arr)) {
      for (const [key, value] of arr) {
        this.set(key, value)
      }
    }
  }

  public get(query: string) {
    const node = super.get(query)
    return node && node.value
  }

  public match(query: string, count?: number): V[] {
    if (!query) {
      return []
    }

    const path: Node[] = []
    const result: V[] = []
    const closestNode = getClosestNode(this.rootSocket, query)

    if (!closestNode) {
      return []
    }

    let node = closestNode

    while (true) {
      if (count && result.length >= count) {
        break
      }

      if (node.key) {
        result.push(node.value)
      }

      const nodes = [...node.socket.values()]
      const nodesLen = nodes.length

      if (nodesLen >= 2) {
        for (const pathNode of nodes.slice(1)) {
          path.push(pathNode)
        }
      } else if (nodesLen === 0) {
        const nextNode = path.pop()

        if (!nextNode) {
          break
        }

        node = nextNode
        continue
      }

      node = nodes[0]
    }

    return result
  }

  public set(key: string, value: V): this {
    if (!key) {
      return this
    }

    let node = new Node(this.rootSocket)

    for (let n = 0, len = key.length; n < len; n += 1) {
      const char = key[n]
      let nextNode = node.socket.get(char)

      if (!nextNode) {
        nextNode = new Node()
        node.socket.set(char, nextNode)
      }

      node = nextNode!
    }

    node.key = key
    node.value = value

    return super.set(key, node)
  }

  public delete(query: string): boolean {
    const end = super.get(query)

    if (!end) {
      return false
    }

    if (end.socket.size) {
      delete end.key
      delete end.value
      super.delete(query)
      return true
    }

    let node = new Node(this.rootSocket)
    let point: Point | null = null

    for (let n = 0, len = query.length; n < len; n++) {
      const char = query[n]

      if (!node.socket.has(char)) {
        return true
      }

      const nodes = [...node.socket.entries()]

      if (node.key || nodes.length >= 2) {
        point = [node, char]
      }

      node = nodes[0][1]
    }

    if (!point) {
      this.clear()
      return true
    }

    point[0].socket.delete(point[1])
    super.delete(query)
    return true
  }

  public clear(): void {
    this.rootSocket = new Map()
    super.clear()
  }
}
