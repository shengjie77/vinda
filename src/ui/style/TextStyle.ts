import { cloneProperty } from 'src/common/types'
import { Color } from 'src/common/color'
import { Font } from 'src/common/font'
import { Alignment } from 'src/common/geometry'

import { Style } from './Style'

export class TextStyle extends Style {
  @cloneProperty()
  public font: Font

  @cloneProperty()
  public color: Color

  @cloneProperty()
  public horizontalAlignment: Alignment

  @cloneProperty()
  public verticalAlignment: Alignment

  public static create() {
    return new TextStyle()
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private constructor() {
    super()

    this.font = Font.create()
    this.color = Color.BLACK
    this.horizontalAlignment = Alignment.Center
    this.verticalAlignment = Alignment.Center
  }
}
