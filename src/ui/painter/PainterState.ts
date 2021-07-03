import { Pen, Brush } from 'src/ui/painter'
import { Cloneable } from 'src/common'
import { Matrix, Transform } from 'src/common/geometry'
import { Optional } from 'src/common/types'
import { Font } from 'src/common/font'

export class PainterState implements Cloneable {
  public pen: Pen = new Pen()
  public brush: Brush = new Brush()
  public clipPath: Optional<Path2D> = undefined
  public font: Font = new Font()

  public matrix: Matrix = Matrix.fromIdentity()

  constructor() {
    const ratio = window.devicePixelRatio
    this.matrix.scaleX *= ratio
    this.matrix.scaleY *= ratio
  }

  public clone(): PainterState {
    const state = new PainterState()

    state.pen = this.pen.clone()
    state.brush = this.brush.clone()
    state.matrix = this.matrix.clone()
    state.clipPath = this.clipPath ? new Path2D(this.clipPath) : undefined
    state.font = this.font.clone()

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
