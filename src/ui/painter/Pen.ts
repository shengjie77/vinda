import { isEqual } from 'src/common'
import { cloneProperty, Cloneable, Equalable } from 'src/common/types'
import { Color } from 'src/common/color'

import { PenCap } from './PenCap'
import { PenJoin } from './PenJoin'

export class Pen extends Cloneable implements Equalable {
  public static create() {
    return new Pen()
  }

  @cloneProperty()
  public color: Color = Color.BLACK

  @cloneProperty()
  public width: number = 1.0

  @cloneProperty()
  public cap: PenCap = PenCap.Butt

  @cloneProperty()
  public join: PenJoin = PenJoin.Bevel

  public equalTo(pen: Pen) {
    return (
      this.color.equalTo(pen.color) &&
      isEqual(this.width, pen.width) &&
      this.cap === pen.cap &&
      this.join === pen.join
    )
  }
}
