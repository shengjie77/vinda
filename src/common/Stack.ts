import { lastOf, assertNotNullable } from 'src/common'

export class Stack<T> {
  public get count(): number {
    return this.stack.length
  }

  public push(v: T) {
    this.stack.push(v)
  }

  public pop(): T | undefined {
    return this.stack.pop()
  }

  public isEmpty(): boolean {
    return this.count === 0
  }

  public top(): T {
    const value = lastOf(this.stack)

    assertNotNullable(value)

    return value
  }

  // ------------------------------------------------------- //
  // ---------------  Private Section Below  --------------- //
  // ------------------------------------------------------- //

  private stack: T[] = []
}
