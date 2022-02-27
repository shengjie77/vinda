import { Matrix } from 'src/base/geometry'
import { Cloneable, cloneProperty } from 'src/base/types'

export class Scale extends Cloneable {
  @cloneProperty()
  public x: number = 1.0

  @cloneProperty()
  public y: number = 1.0

  public toString() {
    return `Scale(x:${this.x},y:${this.y})`
  }

  public toMatrix() {
    return Matrix.fromScale(this.x, this.y)
  }
}
