import { Color } from 'src/common/color'
import { cloneProperty } from 'src/common/types'

import { Style } from './Style'

export class BackgroundStyle extends Style {
  @cloneProperty()
  public color: Color = Color.WHITE

  public static create(): BackgroundStyle {
    return new BackgroundStyle()
  }
}
