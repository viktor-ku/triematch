import * as fs from 'fs'
import * as path from 'path'
import { Trie } from '../src/Trie'
import { Perf } from './Perf'

const d100k = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'd100000.json'), 'utf-8'))

const store100k = new Trie(d100k)

new Perf('triematch')
  .add('Trie with 100k entries in it', () => {
    store100k.match('Michael')
  })
  .run()
