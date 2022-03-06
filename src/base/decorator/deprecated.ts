/**
 * Marking deprecated method
 *
 * @param {string} [message]
 * @returns
 */
export function deprecated(message?: string) {
  return (target: any, key: string | symbol, desp: PropertyDescriptor) => {
    const method = desp.value
    desp.value = (...args: any) => {
      console.warn(
        `Deprecated: ${key.toString()} is deprecated. ${message || ''}`
      )
      method.call(target, ...args)
    }
  }
}
