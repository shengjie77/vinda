import { Color } from 'src/common/color'

import { Style } from './Style'

export class BorderStyle implements Style {
  public width: number = 0
  public radius: number = 0
  public color: Color = Color.TRANSPARENT

  public static create(): BorderStyle {
    return new BorderStyle()
  }

  public clone() {
    const v = BorderStyle.create()

    v.width = this.width
    v.radius = this.radius
    v.color = this.color.clone()

    return v
  }
}
