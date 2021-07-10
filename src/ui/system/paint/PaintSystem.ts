import { Font } from 'src/common/font'
import { Size } from 'src/common/geometry'
import { Painter, CanvasPainter } from 'src/ui/painter'
import { View } from 'src/ui/view'

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

  public paint(views: View[]) {
    views.forEach((v) => this.paintRecursively(v))
  }

  public measureText(text: string, font: Font): Size {
    this._painter.save()

    this._painter.font = font.clone()
    const size = this._painter.measureText(text)

    this._painter.restore()

    return size
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private paintRecursively(view: View) {
    this._painter.save()

    this._painter.matrix = this._painter.matrix
      .clone()
      .append(view.getTransform().toMatrix())
    view.paint(this._painter)
    view.getChildren().forEach((e) => this.paintRecursively(e))

    this._painter.restore()
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _ctx: CanvasRenderingContext2D
  private _painter: Painter
}
