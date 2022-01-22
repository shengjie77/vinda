import { ConstructorOf, Cloneable, cloneProperty } from 'src/base/types'

import { Size } from './Size'
import { Vector } from './Vector'

export class Rect extends Cloneable {
  public static create(p?: RectParam): Rect {
    const rect = new Rect()
    if (p) {
      rect.update(p)
    }

    return rect
  }

  @cloneProperty()
  public top: number = 0

  @cloneProperty()
  public bottom: number = 0

  @cloneProperty()
  public left: number = 0

  @cloneProperty()
  public right: number = 0

  public get topLeft(): Vector {
    return new Vector(this.left, this.top)
  }

  public set topLeft(pt: Vector) {
    this.left = pt.x
    this.top = pt.y
  }

  public get topRight(): Vector {
    return new Vector(this.right, this.top)
  }

  public set topRight(pt: Vector) {
    this.right = pt.x
    this.top = pt.y
  }

  public get bottomLeft(): Vector {
    return new Vector(this.left, this.bottom)
  }

  public set bottomLeft(pt: Vector) {
    this.left = pt.x
    this.bottom = pt.y
  }

  public get bottomRight(): Vector {
    return new Vector(this.right, this.bottom)
  }

  public set bottomRight(pt: Vector) {
    this.right = pt.x
    this.bottom = pt.y
  }

  public get x(): number {
    return this.left
  }

  public set x(v: number) {
    const delta = v - this.left
    this.left = v
    this.right += delta
  }

  public get y(): number {
    return this.top
  }

  public set y(v: number) {
    const delta = v - this.top
    this.top = v
    this.bottom += delta
  }

  public get width(): number {
    return this.right - this.left
  }

  public set width(v: number) {
    this.right = this.left + v
  }

  public get height(): number {
    return this.bottom - this.top
  }

  public set height(v: number) {
    this.bottom = this.top + v
  }

  public get center(): Vector {
    return new Vector(
      (this.left + this.right) / 2,
      (this.top + this.bottom) / 2
    )
  }

  public get size(): Size {
    return Size.create({
      width: this.width,
      height: this.height,
    })
  }

  public set size(v: Size) {
    this.width = v.width
    this.height = v.height
  }

  public update(p: RectParam) {
    if (isParamV1(p)) {
      this.x = p.x
      this.y = p.y
      this.width = p.width
      this.height = p.height
    } else if (isParamV2(p)) {
      this.top = p.top
      this.bottom = p.bottom
      this.left = p.left
      this.right = p.right
    } else {
      this.left = Math.min(p.p1.x, p.p2.x)
      this.right = Math.max(p.p1.x, p.p2.x)
      this.top = Math.min(p.p1.y, p.p2.y)
      this.bottom = Math.max(p.p1.y, p.p2.y)
    }
  }

  public shrink(val: number | ParamV2): this {
    if (isParamV2(val)) {
      this.top += val.top
      this.bottom -= val.bottom
      this.left += val.left
      this.right -= val.right
    } else {
      this.x = this.x + val
      this.y += val
      this.width -= val * 2
      this.height -= val * 2
    }

    return this
  }

  public contains(pos: Vector): boolean {
    return (
      pos.x >= this.left &&
      pos.x <= this.right &&
      pos.y >= this.top &&
      pos.y <= this.bottom
    )
  }
}

interface RectStatic {
  from(p: RectParam): Rect
}

export type RectConstructor = ConstructorOf<Rect, RectStatic>

export type RectParam = ParamV1 | ParamV2 | ParamV3

type ParamV1 = { x: number; y: number; width: number; height: number }
type ParamV2 = {
  top: number
  bottom: number
  left: number
  right: number
}
type ParamV3 = { p1: Vector; p2: Vector }

function isParamV1(p: RectParam): p is ParamV1 {
  return (p as ParamV1).width !== undefined
}

function isParamV2(p: any): p is ParamV2 {
  return (p as ParamV2).left !== undefined
}
