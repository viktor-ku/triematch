// tslint:disable no-console

import * as Benchmark from 'benchmark'
import chalk from 'chalk'
import * as filesize from 'filesize'
import * as ora from 'ora'
import * as os from 'os'

const color = {
  primary: chalk.blue,
}

type Subject = () => void

const oraOptions: ora.Options = {
  color: 'blue',
  interval: 32,
}

function percentDiff(a: number, b: number): string {
  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return ((100 * max / min) - 100).toFixed(2) + '%'
}

function about() {
  console.log(color.primary.bold('='), 'About the system')
  console.group()

  const info = [[
    'Node',
    process.versions.node,
  ], [
    'V8',
    process.versions.v8,
  ], [
    'OS',
    `${os.type()} ${os.release()} ${os.arch()}`,
  ], [
    'CPU',
    os.cpus()[0].model,
  ], [
    'RAM',
    filesize(os.totalmem()),
  ]]

  info.forEach(([key, value]) => {
    console.log(color.primary(`${key}:`), value)
  })

  console.groupEnd()
  console.log()
}

export class Perf {
  private suite = new Benchmark.Suite(this.name, {
    minSamples: 1024,
    initCount: 1024,
  })

  constructor(private name: string) {
    about()
  }

  public add(name: string, subject: Subject) {
    const spinner = ora({
      text: name,
      ...oraOptions,
    })

    this.suite.add(name, subject, {
      onStart: () => {
        spinner.start()
      },
      onComplete: () => {
        spinner.stop()
      },
    })

    return this
  }

  public run() {
    this.suite
      .run({ async: true })
      .on('cycle', (e: Benchmark.Event) => {
        console.log(
          chalk.bold(color.primary.bold('>')),
          e.target.toString(),
        )
      })
  }
}
