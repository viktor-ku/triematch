import { Node } from './Node'

export type Char = string
export type Socket<V = any> = Map<Char, Node<V>>

export function getClosestNode(socket: Socket, query: string): Node | null {
  let node = new Node(socket)

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
