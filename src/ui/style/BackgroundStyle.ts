import { Color } from 'src/common'

import { Style } from './Style'

export class BackgroundStyle implements Style {
  public color: Color = Color.TRANSPARENT

  public static create(): BackgroundStyle {
    return new BackgroundStyle()
  }

  public clone(): BackgroundStyle {
    const v = BackgroundStyle.create()

    v.color = this.color.clone()

    return v
  }
}
