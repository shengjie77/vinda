import {
  PathFillRule,
  Line,
  Vector,
  Ellipse,
  EllipseLike,
  Polygon,
  Rect,
  RectParam,
} from 'src/base/geometry'

export class Path {
  public static fromLine(line: Line): Path {
    const p = new Path()

    p.moveTo(line.p1)
    p.lineTo(line.p2)

    return p
  }

  public fillRule: PathFillRule = PathFillRule.NonZero

  public moveTo(pt: Vector) {
    this._path2d.moveTo(pt.x, pt.y)
  }

  public lineTo(pt: Vector) {
    this._path2d.lineTo(pt.x, pt.y)
  }

  public close() {
    this._path2d.closePath()
  }

  public toPath2D(): Path2D {
    return new Path2D(this._path2d)
  }

  public addEllipse(e: Ellipse | EllipseLike) {
    // UNIMPLEMENTED:
    return {} as any
  }

  public addPath(p: Path) {
    // UNIMPLEMENTED:
    return {} as any
  }

  public addPolygon(p: Polygon) {
    // UNIMPLEMENTED:
    return {} as any
  }

  public addRect(r: Rect | RectParam) {
    // UNIMPLEMENTED:
    return {} as any
  }

  // ------------------------------------------------------- //
  // ---------------  Private Section Below  --------------- //
  // ------------------------------------------------------- //

  private _path2d: Path2D = new Path2D()
}
