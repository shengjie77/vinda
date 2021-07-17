import { Cloneable, cloneProperty } from 'src/common/types'
import {
  BorderStyle,
  BackgroundStyle,
  CursorStyle,
  PaddingStyle,
  LayoutStyle,
} from 'src/ui/style'

export class ViewStylesheet extends Cloneable {
  @cloneProperty()
  public border: BorderStyle = BorderStyle.create()

  @cloneProperty()
  public padding: PaddingStyle = PaddingStyle.create()

  @cloneProperty()
  public background: BackgroundStyle = BackgroundStyle.create()

  @cloneProperty()
  public cursor: CursorStyle = CursorStyle.create()

  @cloneProperty()
  public layout: LayoutStyle = LayoutStyle.create()

  public static create(): ViewStylesheet {
    return new ViewStylesheet()
  }
}
