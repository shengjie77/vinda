import { isEqual } from 'src/base/utils'
import { Angle, Matrix } from 'src/base/geometry'
import { cloneProperty, Cloneable } from 'src/base/types'

export class Vector extends Cloneable {
  public static create(pt: VectorLike = { x: 0, y: 0 }) {
    return new Vector(pt.x, pt.y)
  }

  @cloneProperty()
  public x: number

  @cloneProperty()
  public y: number

  constructor(x: number = 0, y: number = 0) {
    super()

    this.x = x
    this.y = y
  }

  public get angle(): Angle {
    const length = Math.sqrt(this.x * this.x + this.y * this.y)
    const radian = Math.acos(this.x / length)
    return Angle.fromRadian(
      Math.sin(this.y / length) > 0 ? radian : radian * -1
    )
  }

  public transform(m: Matrix): Vector {
    const x = this.x * m.a + this.y * m.c + m.tx
    const y = this.x * m.b + this.y * m.d + m.ty

    this.x = x
    this.y = y

    return this
  }

  public equalTo(v: Vector): boolean {
    return isEqual(this.x, v.x) && isEqual(this.y, v.y)
  }

  public toString() {
    return `Vector(x:${this.x}, y:${this.y})`
  }

  public toMatrix() {
    return Matrix.fromTranslate(this.x, this.y)
  }
}

export interface VectorLike {
  x: number
  y: number
}
