import { Color } from 'src/common/color'
import { Font } from 'src/common/font'
import { Alignment } from 'src/common/geometry'

import { Style } from './Style'

export class TextStyle implements Style {
  public font: Font
  public color: Color
  public horizontalAlignment: Alignment
  public verticalAlignment: Alignment

  public static create() {
    return new TextStyle()
  }

  public clone(): TextStyle {
    const v = TextStyle.create()

    v.font = this.font.clone()
    v.color = this.color.clone()
    v.horizontalAlignment = this.horizontalAlignment
    v.verticalAlignment = this.verticalAlignment

    return v
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
