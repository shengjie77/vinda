import { cloneProperty, Optional } from 'src/common/types'
import { CrossAxisAlignment, MainAxisAlignment } from 'src/ui/system/layout'
import { InsetsValue } from './InsetsValue'

import { Style } from './Style'

export class LayoutStyle extends Style {
  @cloneProperty()
  public type: LayoutValue = LayoutValue.Column

  @cloneProperty()
  public width: NumberValue

  @cloneProperty()
  public height: NumberValue

  @cloneProperty()
  public widthFlex: number = 0

  @cloneProperty()
  public heightFlex: number = 0

  @cloneProperty()
  public mainAxisAlign: MainAxisAlignment = MainAxisAlignment.Start

  @cloneProperty()
  public crossAxisAlign: CrossAxisAlignment = CrossAxisAlignment.Start

  @cloneProperty()
  public margin: InsetsValue = InsetsValue.create()

  public static create(): LayoutStyle {
    return new LayoutStyle()
  }
}

export type NumberValue = Optional<number>

export enum LayoutValue {
  Row,
  Column,
}
