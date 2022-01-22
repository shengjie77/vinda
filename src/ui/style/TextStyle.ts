import { cloneProperty } from 'src/base/types'
import { Color } from 'src/base/color'
import { Font } from 'src/base/font'
import { Alignment } from 'src/base/geometry'

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
