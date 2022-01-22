import { Matrix } from 'src/base/geometry'

export class Scale {
  public x: number = 1.0
  public y: number = 1.0

  public toString() {
    return `Scale(x:${this.x},y:${this.y})`
  }

  public toMatrix() {
    return Matrix.fromScale(this.x, this.y)
  }
}
