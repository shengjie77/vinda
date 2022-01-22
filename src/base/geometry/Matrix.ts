import { Cloneable, cloneProperty } from 'src/base/types'
import { isEqual } from 'src/base/utils'
import { Angle } from 'src/base/geometry'

/**
 * | a | c | tx |
 * | b | d | ty |
 * | 0 | 0 |  1 |
 *
 * @export
 * @class Matrix
 */
export class Matrix extends Cloneable {
  public static fromIdentity(): Matrix {
    return new Matrix()
  }

  public static fromScale(sx: number, sy: number): Matrix {
    const m = new Matrix()

    m.a = sx
    m.d = sy

    return m
  }

  public static fromTranslate(tx: number, ty: number): Matrix {
    const m = new Matrix()

    m.tx = tx
    m.ty = ty

    return m
  }

  public static fromRotate(angle: Angle): Matrix {
    const m = new Matrix()

    // | cos | -sin |
    // | sin | cos  |
    const radian = angle.radian
    m.a = Math.cos(radian)
    m.b = Math.sin(radian)
    m.c = -Math.sin(radian)
    m.d = Math.cos(radian)

    return m
  }

  public static fromDOMMatrix(matrix: DOMMatrix): Matrix {
    const m = new Matrix()

    m.updateFromArray([
      matrix.a,
      matrix.b,
      matrix.c,
      matrix.d,
      matrix.e,
      matrix.f,
    ])

    return m
  }

  public static fromArray(arr: MatrixArray): Matrix {
    return new Matrix().updateFromArray(arr)
  }

  /**
   * Scale x
   *
   * @type {number}
   * @memberof Matrix
   */
  @cloneProperty()
  public a: number = 1

  /**
   * Skew y
   *
   * @type {number}
   * @memberof Matrix
   */
  @cloneProperty()
  public b: number = 0

  /**
   * Skew x
   *
   * @type {number}
   * @memberof Matrix
   */
  @cloneProperty()
  public c: number = 0

  /**
   * Scale y
   *
   * @type {number}
   * @memberof Matrix
   */
  @cloneProperty()
  public d: number = 1

  /**
   * Translate x
   *
   * @type {number}
   * @memberof Matrix
   */
  @cloneProperty()
  public tx: number = 0

  /**
   * Translate y
   *
   * @type {number}
   * @memberof Matrix
   */
  @cloneProperty()
  public ty: number = 0

  public set scaleX(v: number) {
    this.a = v
  }

  public get scaleX(): number {
    return this.a
  }

  public set skewY(v: number) {
    this.b = v
  }

  public get skewY(): number {
    return this.b
  }

  public set skewX(v: number) {
    this.c = v
  }

  public get skewX(): number {
    return this.c
  }

  public set scaleY(v: number) {
    this.d = v
  }

  public get scaleY(): number {
    return this.d
  }

  /**
   * Multiplied by a transform on the right
   *
   * @param {Matrix} t2
   * @memberof Matrix
   */
  public append(t2: Matrix): Matrix {
    const t1 = this.clone()
    this.a = t1.a * t2.a + t1.c * t2.b + 0
    this.c = t1.a * t2.c + t1.c * t2.d + 0
    this.tx = t1.a * t2.tx + t1.c * t2.ty + t1.tx
    this.b = t1.b * t2.a + t1.d * t2.b + 0
    this.d = t1.b * t2.c + t1.d * t2.d + 0
    this.ty = t1.b * t2.tx + t1.d * t2.ty + t1.ty

    return this
  }

  public scale(sx: number, sy: number): Matrix {
    return this.append(Matrix.fromScale(sx, sy))
  }

  public translate(tx: number, ty: number): Matrix {
    return this.append(Matrix.fromTranslate(tx, ty))
  }

  public rotate(angle: Angle): Matrix {
    return this.append(Matrix.fromRotate(angle))
  }

  public updateFromArray(arr: MatrixArray): Matrix {
    ;[this.a, this.b, this.c, this.d, this.tx, this.ty] = arr

    return this
  }

  public equalTo(t: Matrix): boolean {
    const a1 = this.toArray()
    const a2 = t.toArray()

    return a1.every((v, i) => isEqual(v, a2[i]))
  }

  public toArray(): MatrixArray {
    return [this.a, this.b, this.c, this.d, this.tx, this.ty]
  }

  public toDOMMatrix(): DOMMatrix {
    return new DOMMatrix(this.toArray())
  }

  // ------------------------------------------------------- //
  // ---------------  Private Section Below  --------------- //
  // ------------------------------------------------------- //
}

export type MatrixArray = [
  a: number,
  b: number,
  c: number,
  d: number,
  tx: number,
  ty: number
]
