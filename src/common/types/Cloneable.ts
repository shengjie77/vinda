import { isNumber, isString, isBoolean, isUndefined } from 'lodash'

const CloneableKeys = Symbol('CloneableKeys')

/**
 * Cloneable represents an object that can be cloned.
 *
 * @export
 */
export class Cloneable {
  public clone(): this {
    const instance: any = this
    const clonedInstance = Object.create(instance.constructor.prototype)
    const targetKeys = instance[CloneableKeys]
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
    if (instance[CloneableKeys] === undefined) {
      instance[CloneableKeys] = []
    }

    instance[CloneableKeys].push(key)
  }
}

function canClone(v: any): boolean {
  return isNumber(v) || isString(v) || isBoolean(v) || v instanceof Cloneable
}

function clone<T>(val: T): T {
  if (val instanceof Cloneable) {
    return val.clone()
  }

  return val
}

export function printCloneKeys(v: Cloneable) {
  console.log((v as any)[CloneableKeys])
}
