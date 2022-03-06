export function assertIsDefined<T>(
  val?: T,
  message?: string
): asserts val is T {
  if (val === undefined || val === null) {
    throw new Error(message)
  }
}

export function assert(val: boolean, message?: string): asserts val {
  if (!val) {
    throw new Error(message)
  }
}

export function assertNotNullable<T>(
  val: T | undefined | null,
  message?: string
): asserts val is T {
  if (val === undefined || val === null) {
    throw new Error(message)
  }
}
