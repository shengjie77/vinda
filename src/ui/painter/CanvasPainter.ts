import {
  Painter,
  Brush,
  Pen,
  PainterState,
  PainterContext,
} from 'src/ui/painter'
import {
  Line,
  Rect,
  Path,
  Polygon,
  Transform,
  Ellipse,
  RoundedRect,
  Alignment,
  Matrix,
  Size,
} from 'src/common/geometry'
import { Optional } from 'src/common/types'
import { Color, Stack } from 'src/common'
import { Font } from 'src/common/font'

import { TextOption } from './Painter'

export class CanvasPainter implements Painter {
  public static create(ctx: PainterContext) {
    return new CanvasPainter(ctx)
  }

  constructor(ctx: PainterContext) {
    this.ctx = ctx
  }

  public get pen(): Pen {
    return this.state.pen
  }

  public set pen(v: Pen) {
    this.state.pen = v
  }

  public get brush(): Brush {
    return this.state.brush
  }

  public set brush(v: Brush) {
    this.state.brush = v
  }

  public get clipPath(): Optional<Path2D> {
    return this.state.clipPath
  }

  public set clipPath(path: Optional<Path2D>) {
    this.state.clipPath = path
  }

  public set font(f: Font) {
    this.state.font = f
  }

  public get font(): Font {
    return this.state.font
  }

  public get matrix(): Matrix {
    return this.state.matrix
  }

  public set matrix(v: Matrix) {
    this.state.matrix = v
  }

  public strokeLine(line: Line) {
    this.strokePath(Path.fromLine(line))
  }

  public strokePath(path: Path) {
    this.applyState()

    this.ctx.stroke(path.toPath2D())
  }

  public strokeRect(rect: Rect) {
    this.applyState()

    this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
  }

  public strokeEllipse(ellipse: Ellipse) {
    // UNIMPLEMENTED:
    return {} as any
  }

  public strokeRoundedRect(rect: Rect, radius: number) {
    this.applyState()

    let path = roundedRectToPath2D(rect, radius)
    this.ctx.stroke(path)
  }

  public strokePolygon(polygon: Polygon) {
    // UNIMPLEMENTED:
    return {} as any
  }

  public fillPath(path: Path) {
    this.applyState()

    this.ctx.fill(path.toPath2D(), path.fillRule)
  }

  public fillRect(rect: Rect) {
    this.applyState()

    this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
  }

  public fillRoundedRect(rect: Rect, xRadius: number, yRadius: number) {
    this.applyState()

    const r = new RoundedRect(rect, xRadius)
    this.ctx.fill(r.toPath2D())
  }

  public fillPolygon(polygon: Polygon) {
    // UNIMPLEMENTED:
    return {} as any
  }

  public drawText(text: string, rect: Rect, opt?: Partial<TextOption>) {
    this.applyState()

    const option = mergeDefaultTextOption(opt)
    const metric = this.ctx.measureText(text)
    const height =
      metric.actualBoundingBoxAscent + metric.actualBoundingBoxDescent

    const xMap: any = {
      [Alignment.Left]: () => rect.left,
      [Alignment.Center]: () => rect.center.x - metric.width / 2,
      [Alignment.Right]: () => rect.right - metric.width,
    }

    const yMap: any = {
      [Alignment.Top]: () => rect.top + height,
      [Alignment.Center]: () =>
        rect.center.y - height / 2 + metric.actualBoundingBoxAscent,
      [Alignment.Bottom]: () => rect.bottom,
    }

    // this.drawTestRect(rect)
    const x = xMap[option.horizontalAlignment]()
    const y = yMap[option.verticalAlignment]()
    this.ctx.fillText(text, x, y)
  }

  public measureText(text: string): Size {
    this.applyState()

    const size = Size.create()
    const metric = this.ctx.measureText(text)
    size.width = metric.width
    size.height =
      metric.actualBoundingBoxAscent + metric.actualBoundingBoxDescent

    return size
  }

  /**
   * Saves the current painter state(pushes the state onto a stack).
   *
   * @memberof CanvasPainter
   */
  public save() {
    this.stateStack.push(this.state.clone())
    this.ctx.save()
  }

  /**
   * Restores the current painter state(pops a saved state off the stack).
   *
   * @memberof CanvasPainter
   */
  public restore() {
    this.ctx.restore()
    if (this.stateStack.isEmpty()) {
      return
    }

    this.state = this.stateStack.pop()!
  }

  public test() {}

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //

  /**
   * Apply current PainterState to CanvasRenderingContext.
   *
   * @private
   * @memberof CanvasPainter
   */
  private applyState() {
    this.ctx.lineWidth = this.pen.width
    this.ctx.lineCap = this.pen.cap
    this.ctx.lineJoin = this.pen.join
    this.ctx.strokeStyle = this.pen.color.toCSSColor()
    this.ctx.fillStyle = this.brush.color.toCSSColor()
    this.ctx.font = this.state.font.toCSSString()

    this.ctx.setTransform(this.state.matrix.toDOMMatrix())
    if (this.clipPath) {
      this.ctx.clip(this.clipPath, 'evenodd')
    }
  }

  private drawTestRect(rect: Rect) {
    this.save()

    this.pen = Pen.create()
    this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)

    this.restore()
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private ctx: PainterContext
  private stateStack: Stack<PainterState> = new Stack()
  private state: PainterState = new PainterState()
}

function roundedRectToPath2D(rect: Rect, radius: number): Path2D {
  const r = new RoundedRect(rect, radius)
  return r.toPath2D()
}

function mergeDefaultTextOption(opt?: Partial<TextOption>): TextOption {
  const defaultOpt: TextOption = {
    horizontalAlignment: Alignment.Center,
    verticalAlignment: Alignment.Center,
  }

  return {
    ...defaultOpt,
    ...opt,
  }
}
