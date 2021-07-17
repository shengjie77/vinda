import { cloneProperty } from 'src/common/types'
import { TextStyle } from 'src/ui/style/TextStyle'

import { ViewStylesheet } from './ViewStylesheet'

export class ButtonStylesheet extends ViewStylesheet {
  @cloneProperty()
  public text: TextStyle = TextStyle.create()

  public static create(): ButtonStylesheet {
    return new ButtonStylesheet()
  }
}
