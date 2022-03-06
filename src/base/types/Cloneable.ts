import { isNumber, isString, isBoolean, isUndefined } from 'lodash'

const GlobalCloneKeyMap = new Map()

/**
 * Cloneable represents an object that can be cloned.
 *
 * @export
 */
export class Cloneable {
  public clone(): this {
    const instance: any = this
    const clonedInstance = Object.create(instance.constructor.prototype)
    const targetKeys = getCloneKeys(instance)
    if (targetKeys === undefined) {
      console.warn(
        `There is no cloneable properties in ${instance.constructor.name}`
      )
      return clonedInstance
    }

    for (const key of targetKeys) {
      const val = instance[key]
      if (!canClone(val)) {
        continue
      }

      clonedInstance[key] = clone(val)
    }

    return clonedInstance
  }
}

export function cloneProperty() {
  return function (instance: any, key: string) {
    registerCloneKey(instance, key)
  }
}

function registerCloneKey(instance: any, key: string) {
  const Constructor = instance.constructor
  let keys: string[] = GlobalCloneKeyMap.get(Constructor)
  if (isUndefined(keys)) {
    keys = []
    GlobalCloneKeyMap.set(Constructor, keys)
  }
  keys.push(key)
}

function getCloneKeys(instance: any) {
  const Constructor = instance.constructor
  let keys: string[] = GlobalCloneKeyMap.get(Constructor)
  return keys
}

function canClone(v: any): boolean {
  return (
    v instanceof Cloneable ||
    isNumber(v) ||
    isString(v) ||
    isBoolean(v) ||
    isUndefined(v)
  )
}

export function clone<T>(val: T): T {
  if (val instanceof Cloneable) {
    return val.clone()
  }

  return val
}

export function printCloneKeys(v: Cloneable) {
  console.log(getCloneKeys(v))
}
