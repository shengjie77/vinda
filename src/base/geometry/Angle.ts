import { isEqual } from 'src/base/utils'
import { Matrix } from 'src/base/geometry'
import { cloneProperty, Cloneable, Equalable } from 'src/base/types'

/**
 * 正值代表从 x 轴正向向 y 轴正向旋转,
 * 在屏幕坐标系下就是顺时针旋转
 */
export class Angle extends Cloneable implements Equalable {
  public static fromDegree(deg: number): Angle {
    const angle = new Angle()
    angle.degree = deg

    return angle
  }

  public static fromRadian(rad: number): Angle {
    const angle = new Angle()
    angle.radian = rad

    return angle
  }

  public set degree(deg: number) {
    this.radian = degreeToRadian(deg)
  }

  public get degree(): number {
    return radianToDegree(this.radian)
  }

  public set radian(rad: number) {
    this._radian = rad
  }

  public get radian(): number {
    return this._radian
  }

  public normalize() {
    const result = normalizeRadian(this._radian)
    this._radian = result
  }

  public equalTo(a: Angle): boolean {
    const v1 = normalizeRadian(this.radian)
    const v2 = normalizeRadian(a.radian)
    return isEqual(v1, v2)
  }

  public toString() {
    return `Angle(${this.degree})`
  }

  public toMatrix() {
    return Matrix.fromRotate(this)
  }

  // ------------------------------------------------------- //
  // ---------------  Private Section Below  --------------- //
  // ------------------------------------------------------- //

  @cloneProperty()
  private _radian: number = 0
}

function degreeToRadian(angle: number) {
  const radian = (angle / 180) * Math.PI
  return radian
}

function radianToDegree(radian: number) {
  const degree = (radian / Math.PI) * 180
  return degree
}

function normalizeRadian(radian: number) {
  const result = radian % (Math.PI * 2)
  return result < 0 ? result + Math.PI * 2 : result
}
