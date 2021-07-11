import { cloneProperty } from 'src/common/types'
import { Color } from 'src/common/color'

import { Style } from './Style'

export class BorderStyle extends Style {
  @cloneProperty()
  public width: number = 0

  @cloneProperty()
  public radius: number = 0

  @cloneProperty()
  public color: Color = Color.TRANSPARENT

  public static create(): BorderStyle {
    return new BorderStyle()
  }
}
