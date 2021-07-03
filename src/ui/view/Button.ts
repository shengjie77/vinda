import { Painter } from 'src/ui/painter'
import { TextStyle } from 'src/ui/style'

import { View } from './View'
import { paintText } from './utils'

export class Button extends View {
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

    paintText(painter, this._text, this.getLocalRect(), this._style)
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _text: string = ''
  private _style: TextStyle = TextStyle.create()
}
