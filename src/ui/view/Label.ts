import { Color } from 'src/common'
import { Font } from 'src/common/font'
import { Alignment, Rect, Size } from 'src/common/geometry'
import { Brush, Painter } from 'src/ui/painter'

import { View } from './View'

class TextStyle {
  public font: Font
  public color: Color
  public horizontalAlignment: Alignment
  public verticalAlignment: Alignment

  public static create() {
    return new TextStyle()
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private constructor() {
    this.font = Font.create()
    this.color = Color.BLACK
    this.horizontalAlignment = Alignment.Center
    this.verticalAlignment = Alignment.Center
  }
}

function paintText(
  painter: Painter,
  text: string,
  rect: Rect,
  style: TextStyle
) {
  painter.save()

  const textRect = rect.clone()

  const brush = new Brush()
  brush.color = style.color
  painter.brush = brush
  painter.font = style.font

  if (textRect.size.isEmpty()) {
    const size = measureText(painter, text, style)
    textRect.size = size
  }

  painter.drawText(text, textRect, {
    horizontalAlignment: style.horizontalAlignment,
    verticalAlignment: style.verticalAlignment,
  })

  painter.restore()
}

function measureText(painter: Painter, text: string, style: TextStyle): Size {
  painter.save()

  painter.font = style.font
  const size = painter.measureText(text)

  painter.restore()

  return size
}

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

    paintText(painter, 'Hello', rect, this._style)
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
