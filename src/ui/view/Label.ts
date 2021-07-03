import { Size } from 'src/common/geometry'
import { Painter } from 'src/ui/painter'
import { TextStyle } from 'src/ui/style'

import { View } from './View'
import { paintText } from './utils'

export class Label extends View {
  public static create(): Label {
    return new Label()
  }

  public getText(): string {
    return this._text
  }

  public setText(text: string) {
    this._text = text
  }

  public override paint(painter: Painter) {
    super.paint(painter)
    const rect = this.getLocalRect()

    paintText(painter, this._text, rect, this._style)
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private constructor() {
    super()

    this._text = ''
    this._style = TextStyle.create()
    this._defaultSize = Size.create()
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _text: string
  private _style: TextStyle
  private _defaultSize: Size
}
