import { Color } from 'src/base/color'
import { cloneProperty } from 'src/base/types'

import { Style } from './Style'

export class BackgroundStyle extends Style {
  @cloneProperty()
  public color: Color = Color.WHITE

  public static create(): BackgroundStyle {
    return new BackgroundStyle()
  }
}
