import { Cloneable, cloneProperty } from 'src/common/types'

import { BackgroundStyle } from './BackgroundStyle'
import { BorderStyle } from './BorderStyle'
import { PaddingStyle } from './PaddingStyle'
import { CursorStyle } from './CursorStyle'

export class ViewStylesheet extends Cloneable {
  @cloneProperty()
  public border: BorderStyle = BorderStyle.create()

  @cloneProperty()
  public padding: PaddingStyle = PaddingStyle.create()

  @cloneProperty()
  public background: BackgroundStyle = BackgroundStyle.create()

  @cloneProperty()
  public cursor: CursorStyle = CursorStyle.create()

  public static create(): ViewStylesheet {
    return new ViewStylesheet()
  }
}
