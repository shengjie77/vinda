export function lastOf<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}

export function isNullable(value: any): boolean {
  return value === null || value === undefined
}

export function isEqual(v1: number, v2: number): boolean {
  const precision = 0.000001
  return Math.abs(v1 - v2) < precision
}

export function allowUnusedLocal<T>(_: T) {}
