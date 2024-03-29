import { Pen, Brush } from 'src/ui/painter'
import { Matrix } from 'src/base/geometry'
import { Optional, cloneProperty, Cloneable } from 'src/base/types'
import { Font } from 'src/base/font'

export class PainterState extends Cloneable {
  @cloneProperty()
  public pen: Pen = new Pen()

  @cloneProperty()
  public brush: Brush = new Brush()

  public clipPath: Optional<Path2D> = undefined

  @cloneProperty()
  public font: Font = new Font()

  @cloneProperty()
  public matrix: Matrix = Matrix.fromIdentity()

  constructor() {
    super()

    const ratio = window.devicePixelRatio
    this.matrix.scaleX *= ratio
    this.matrix.scaleY *= ratio
  }

  public clone() {
    const state = super.clone()
    state.clipPath = this.clipPath ? new Path2D(this.clipPath) : undefined

    return state
  }

  public equalTo(state: PainterState) {
    return (
      this.pen.equalTo(state.pen) &&
      this.brush.equalTo(state.brush) &&
      this.matrix.equalTo(state.matrix) &&
      this.font.equalTo(state.font)
    )
  }
}
