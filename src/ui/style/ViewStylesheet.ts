import { Cloneable } from 'src/common'

import { BackgroundStyle } from './BackgroundStyle'
import { BorderStyle } from './BorderStyle'
import { PaddingStyle } from './PaddingStyle'

export class ViewStylesheet implements Cloneable {
  public border: BorderStyle = BorderStyle.create()
  public padding: PaddingStyle = PaddingStyle.create()
  public background: BackgroundStyle = BackgroundStyle.create()

  public static create(): ViewStylesheet {
    return new ViewStylesheet()
  }

  public clone() {
    const s = ViewStylesheet.create()
    s.border = this.border.clone()
    s.padding = this.padding.clone()
    s.background = this.background.clone()
    return s
  }
}
