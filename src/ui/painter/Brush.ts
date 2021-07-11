import { Cloneable, Equalable } from 'src/common'
import { Color } from 'src/common/color'

export class Brush implements Cloneable, Equalable {
  public static fromColor(color: Color) {
    const brush = new Brush()
    brush.color = color
    return brush
  }

  public color: Color = Color.WHITE

  public clone(): Brush {
    const brush = new Brush()

    brush.color = this.color.clone()

    return brush
  }

  public equalTo(brush: Brush) {
    return this.color.equalTo(brush.color)
  }
}
