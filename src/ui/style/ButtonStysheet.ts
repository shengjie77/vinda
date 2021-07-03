import { TextStyle } from './TextStyle'
import { ViewStylesheet } from './ViewStyleSheet'

export class ButtonStylesheet extends ViewStylesheet {
  public text: TextStyle = TextStyle.create()

  public static create(): ButtonStylesheet {
    return new ButtonStylesheet()
  }

  public clone() {
    // TODO:
    // How to avoid cloning parent's properties manually
    const v = ButtonStylesheet.create()
    v.border = this.border.clone()
    v.padding = this.padding.clone()
    v.background = this.background.clone()
    v.text = this.text.clone()

    return v
  }
}
