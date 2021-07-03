import { Painter } from 'src/ui/painter'
import { TextStyle, ButtonStylesheet } from 'src/ui/style'

import { View } from './View'
import { paintText } from './utils'

export class Button extends View {
  public stylesheet: ButtonStylesheet = ButtonStylesheet.create()

  public static create() {
    return new Button()
  }

  public setText(text: string) {
    this._text = text
  }

  public getText(): string {
    return this._text
  }

  public override paint(painter: Painter) {
    super.paint(painter)

    paintText(painter, this._text, this.getContentRect(), this.stylesheet.text)
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _text: string = ''
}
