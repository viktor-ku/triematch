import { Socket } from './utils'

export class Node<V = any> {
  public socket: Socket<V>
  public value: V
  public key: string

  constructor(socket?: Socket<V>) {
    this.socket = socket || new Map()
  }
}
