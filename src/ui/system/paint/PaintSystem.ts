import { Font } from 'src/common/font'
import { Size } from 'src/common/geometry'
import { Painter, CanvasPainter } from 'src/ui/painter'
import { View } from 'src/ui/view'

export interface PaintSystemProvider {
  getContainer(): HTMLCanvasElement
  getViews(): View[]
}

export class PaintSystem {
  // ------------------------------------------------------- //
  // ------------------  Static Methods  ------------------- //
  // ------------------------------------------------------- //
  public static createFromCanvas(provider: PaintSystemProvider) {
    return new PaintSystem(provider)
  }

  // ------------------------------------------------------- //
  // -------------------  Public Methods  ------------------ //
  // ------------------------------------------------------- //
  constructor(provider: PaintSystemProvider) {
    this._provider = provider
    this._ctx = provider.getContainer().getContext('2d')!
    this._painter = CanvasPainter.create(this._ctx)
    requestAnimationFrame(this.handleFrame)
  }

  public markDirty() {
    this._dirty = true
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

  private handleFrame = () => {
    requestAnimationFrame(this.handleFrame)

    if (!this._dirty) {
      return
    }

    this.paint(this._provider.getViews())
    this._dirty = false
  }

  private paint(views: View[]) {
    views.forEach((v) => this.paintRecursively(v))
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _ctx: CanvasRenderingContext2D
  private _painter: Painter
  private _dirty: boolean = false
  private _provider: PaintSystemProvider
}
