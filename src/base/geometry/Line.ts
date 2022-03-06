import {
  ConstructorOf,
  Equalable,
  cloneProperty,
  Cloneable,
} from 'src/base/types'
import { Vector } from 'src/base/geometry'

export class Line extends Cloneable implements Equalable {
  public static from(p: LineLike): Line {
    const line = new Line()

    if (isRawParam(p)) {
      line.x1 = p.x1
      line.y1 = p.y1
      line.x2 = p.x2
      line.y2 = p.y2
    } else {
      line.p1 = p.p1
      line.p2 = p.p2
    }

    return line
  }

  @cloneProperty()
  public x1: number = 0

  @cloneProperty()
  public y1: number = 0

  @cloneProperty()
  public x2: number = 0

  @cloneProperty()
  public y2: number = 0

  public get p1(): Vector {
    return new Vector(this.x1, this.y1)
  }

  public set p1(pt: Vector) {
    this.x1 = pt.x
    this.y1 = pt.y
  }

  public get p2(): Vector {
    return new Vector(this.x2, this.y2)
  }

  public set p2(pt: Vector) {
    this.x2 = pt.x
    this.y2 = pt.y
  }

  public get length(): number {
    const deltaX = this.x2 - this.x1
    const deltaY = this.y2 - this.y1
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  }

  public equalTo(v: Line) {
    return this.p1.equalTo(v.p1) && this.p2.equalTo(v.p2)
  }
}

export interface LineStatic {
  from(p: LineLike): Line
}

export type LineLike = LineRawParam | LinePointParam

interface LineRawParam {
  x1: number
  y1: number
  x2: number
  y2: number
}

interface LinePointParam {
  p1: Vector
  p2: Vector
}

function isRawParam(p: LineLike): p is LineRawParam {
  return (p as LineRawParam).x1 !== undefined
}

export type LineConstructor = ConstructorOf<Line, LineStatic>
