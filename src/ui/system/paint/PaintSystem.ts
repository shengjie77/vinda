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
  }

  public paint() {
    this._provider.getViews().forEach((v) => this.paintRecursively(v))
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
  private _provider: PaintSystemProvider
}
