import { cloneProperty } from 'src/base/types'

import { Rect, RectParam } from './Rect'

export class RoundedRect extends Rect {
  @cloneProperty()
  public radius: number = 0

  constructor(rect: RectParam, radius: number) {
    super()
    this.update(rect)
    this.radius = radius
  }

  public toPath2D(): Path2D {
    const path = new Path2D()
    const r = this.radius

    path.moveTo(this.left, this.top + r)
    path.arcTo(this.left, this.top, this.left + r, this.top, r)
    path.lineTo(this.right - r, this.top)
    path.arcTo(this.right, this.top, this.right, this.top + r, r)
    path.lineTo(this.right, this.bottom - r)
    path.arcTo(this.right, this.bottom, this.right - r, this.bottom, r)
    path.lineTo(this.left + r, this.bottom)
    path.arcTo(this.left, this.bottom, this.left, this.bottom - r, r)
    path.closePath()

    return path
  }
}
