import { Rect, Vector, VectorLike } from 'src/common/geometry'

export enum FillRule {
  OddEvenFill,
  WindingFill,
}

/**
 * reference: https://doc.qt.io/qt-5/qpolygon.html
 *
 * @export
 * @class Polygon
 */
export class Polygon {
  public static fromPoints(pts: Vector[] | VectorLike[]): Polygon {
    // UNIMPLEMENTED:
    return {} as any
  }

  public get boundingRect(): Rect {
    // UNIMPLEMENTED:
    return {} as any
  }

  public containsPoint(pt: Vector | VectorLike, fillRule: FillRule): boolean {
    // UNIMPLEMENTED:
    return {} as any
  }

  public intersected(r: Polygon): Polygon {
    // UNIMPLEMENTED:
    return {} as any
  }

  public intersects(p: Polygon): boolean {
    // UNIMPLEMENTED:
    return {} as any
  }

  public setPoints(pts: Vector[] | VectorLike[]) {
    // UNIMPLEMENTED:
    return {} as any
  }
}
