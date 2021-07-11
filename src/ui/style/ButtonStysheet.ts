import { cloneProperty } from 'src/common/types'

import { TextStyle } from './TextStyle'
import { ViewStylesheet } from './ViewStyleSheet'

export class ButtonStylesheet extends ViewStylesheet {
  @cloneProperty()
  public text: TextStyle = TextStyle.create()

  public static create(): ButtonStylesheet {
    return new ButtonStylesheet()
  }
}
