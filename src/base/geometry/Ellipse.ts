import { cloneProperty, Cloneable } from 'src/base/types'
import { Rect } from 'src/base/geometry'

export class Ellipse extends Cloneable {
  public static from(param: EllipseParamV1): Ellipse {
    const ellipse = new Ellipse()
    ellipse.x = param.x
    ellipse.y = param.y
    ellipse.width = param.width
    ellipse.height = param.height

    return ellipse
  }

  @cloneProperty()
  public x: number = 0

  @cloneProperty()
  public y: number = 0

  @cloneProperty()
  public width: number = 0

  @cloneProperty()
  public height: number = 0
}

export type EllipseLike = EllipseParamV1 | EllipseParamV2 | Rect

interface EllipseParamV1 {
  x: number
  y: number
  width: number
  height: number
}

interface EllipseParamV2 {
  centerX: number
  centerY: number
  rx: number
  ry: number
}
