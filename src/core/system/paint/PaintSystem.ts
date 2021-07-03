import { Painter, CanvasPainter } from 'src/core/painter'
import { View } from 'src/view'

export class PaintSystem {
  // ------------------------------------------------------- //
  // ------------------  Static Methods  ------------------- //
  // ------------------------------------------------------- //
  public static createFromCanvas(canvas: HTMLCanvasElement) {
    return new PaintSystem(canvas.getContext('2d')!)
  }

  // ------------------------------------------------------- //
  // -------------------  Public Methods  ------------------ //
  // ------------------------------------------------------- //
  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx
    this._painter = CanvasPainter.create(this._ctx)
  }

  public paint() {
    this._painter.test()
    this._views.forEach((e) => this.paintRecursively(e))
  }

  // TODO: delete later
  public addView(entity: View) {
    this._views.push(entity)
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private paintRecursively(view: View) {
    view.paint(this._painter)
    view.getChildPaintEntites().forEach((e) => this.paintRecursively(e))
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _ctx: CanvasRenderingContext2D
  private _painter: Painter
  private _views: View[] = []
}
