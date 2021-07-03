import { Color } from 'src/common'
import { Font } from 'src/common/font'
import { Alignment } from 'src/common/geometry'

export class TextStyle {
  public font: Font
  public color: Color
  public horizontalAlignment: Alignment
  public verticalAlignment: Alignment

  public static create() {
    return new TextStyle()
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private constructor() {
    this.font = Font.create()
    this.color = Color.BLACK
    this.horizontalAlignment = Alignment.Center
    this.verticalAlignment = Alignment.Center
  }
}
