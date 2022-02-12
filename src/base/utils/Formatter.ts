import { Instance } from 'chalk'

// TODO: A lot of options are not supported, try to replace chalk
const chalk = new Instance({
  level: 3,
})

export function tag(tag: string) {
  return chalk.yellow(`[${tag}]`)
}
