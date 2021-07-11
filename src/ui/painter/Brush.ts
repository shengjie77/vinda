import { Cloneable, Equalable, cloneProperty } from 'src/common/types'
import { Color } from 'src/common/color'

export class Brush extends Cloneable implements Equalable {
  public static fromColor(color: Color) {
    const brush = new Brush()
    brush.color = color
    return brush
  }

  @cloneProperty()
  public color: Color = Color.WHITE

  public equalTo(brush: Brush) {
    return this.color.equalTo(brush.color)
  }
}
