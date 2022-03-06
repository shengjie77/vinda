import { isEqual } from 'src/base/utils'
import { Angle, Matrix } from 'src/base/geometry'
import { cloneProperty, Cloneable } from 'src/base/types'
import { Scale } from 'src/base/geometry/Scale'

export class Vector extends Cloneable {
  public static create(pt: VectorLike = { x: 0, y: 0 }) {
    return new Vector(pt.x, pt.y)
  }

  public static fromMouseEvent(ev: MouseEvent) {
    return new Vector(ev.clientX, ev.clientY)
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

    return new Vector(x, y)
  }

  public add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y)
  }

  public sub(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y)
  }

  public mul(v: number): Vector {
    return new Vector(this.x * v, this.y * v)
  }

  public get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  public angleTo(v: Vector): Angle {
    return Angle.fromRadian(Math.atan2(this.x, this.y) - Math.atan2(v.x, v.y))
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

  public toScale() {
    return new Scale(this.x, this.y)
  }
}

export interface VectorLike {
  x: number
  y: number
}
