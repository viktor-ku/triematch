type Char = string

type Socket<V> = Map<Char, Node<V>>

class Node<V> {
  public socket: Socket<V>
  public value?: V
  public key?: string

  constructor(socket?: Socket<V>) {
    this.socket = socket || new Map<Char, Node<V>>()
  }
}

function getClosestNode<V>(socket: Socket<V>, query: string): Node<V> | null {
  let node = new Node<V>(socket)

  for (let n = 0, len = query.length; n < len; n++) {
    const char = query[n]
    const nextNode = node.socket.get(char)

    if (!nextNode) {
      return null
    }

    node = nextNode
  }

  return node
}

type Point<V> = [Node<V>, Char]

/**
 * A fast Trie (prefix tree) with prefix matching.
 *
 * Stores values by exact string keys and supports retrieving all values
 * that share a given prefix via `match`.
 *
 * @template V Type of values stored in the trie
 */
export class Trie<V> extends Map<string, unknown> {
  private rootSocket: Socket<V> = new Map<Char, Node<V>>()

  /**
   * Create a new trie optionally seeded with entries.
   * @param arr Initial key/value pairs
   */
  constructor(arr?: Array<[string, V]>) {
    super()

    if (Array.isArray(arr)) {
      for (const [key, value] of arr) {
        this.set(key, value)
      }
    }
  }

  /**
   * Get a stored value by its exact key.
   * @param query Exact key
   * @returns The stored value, if present
   */
  public get(query: string): V | undefined {
    const node = super.get(query) as Node<V> | undefined
    return node?.value
  }

  /**
   * Find values that match a key prefix.
   * @param query Prefix to search for
   * @param count Optional max number of results
   * @returns Matching values in depth-first order
   */
  public match(query: string, count?: number): V[] {
    if (!query) {
      return []
    }

    const path: Node<V>[] = []
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

      if (node.key !== undefined && node.value !== undefined) {
        result.push(node.value)
      }

      const nodes = [...node.socket.values()]
      const nodesLen = nodes.length

      if (nodesLen >= 2) {
        for (let n = 1, len = nodes.length; n < len; n += 1) {
          path.push(nodes[n])
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

  /**
   * Insert or overwrite a value by key.
   * @param key Exact key
   * @param value Value to store
   * @returns This trie instance
   */
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

      node = nextNode
    }

    node.key = key
    node.value = value

    return super.set(key, node)
  }

  /**
   * Delete a key and its value.
   *
   * The trie structure is compacted when possible; internal nodes are pruned
   * when they no longer lead to any values.
   *
   * @param query Exact key to delete
   * @returns True if something was changed
   */
  public delete(query: string): boolean {
    const end = super.get(query) as Node<V> | undefined

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
    let point: Point<V> | null = null

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

  /**
   * Remove all entries and reset the trie.
   */
  public clear(): void {
    this.rootSocket = new Map()
    super.clear()
  }
}
