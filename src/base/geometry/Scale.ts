import { Matrix } from 'src/base/geometry'
import { Vector } from 'src/base/geometry/Vector'
import { Cloneable, cloneProperty } from 'src/base/types'

export class Scale extends Cloneable {
  @cloneProperty()
  public x: number = 1.0

  @cloneProperty()
  public y: number = 1.0

  constructor(x: number = 1.0, y: number = 1.0) {
    super()

    this.x = x
    this.y = y
  }

  public toString() {
    return `Scale(x:${this.x},y:${this.y})`
  }

  public toMatrix() {
    return Matrix.fromScale(this.x, this.y)
  }

  public toVector() {
    return new Vector(this.x, this.y)
  }
}
