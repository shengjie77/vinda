import { Painter } from 'src/ui/painter'
import { ButtonStylesheet } from 'src/ui/style'
import { PaintSystem } from 'src/ui/system/paint'

import { View } from './View'
import { paintText } from './utils'
import { ViewState } from './ViewState'
import { Size } from 'src/common/geometry'

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

  public getStylesheet(state: ViewState = ViewState.Normal): ButtonStylesheet {
    return this._stylesheetMap.get(state)!
  }

  public setStylesheet(
    stylesheet: ButtonStylesheet,
    state: ViewState = ViewState.Normal
  ) {
    this._stylesheetMap.set(state, stylesheet)
    this.update()
  }

  public override paint(painter: Painter) {
    super.paint(painter)

    paintText(
      painter,
      this._text,
      this.getContentRect(),
      this.getStylesheet().text
    )
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private constructor() {
    super()

    const states = [
      ViewState.Normal,
      ViewState.Hover,
      ViewState.Active,
      ViewState.Disabled,
    ]
    states.forEach((s) => {
      this._stylesheetMap.set(s, ButtonStylesheet.create())
    })
  }

  private update() {
    const font = this.getStylesheet().text.font

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    ctx.font = font.toCSSString()
    const metric: any = ctx.measureText(this._text)
    const size = Size.create()
    size.width = metric.width
    const height = metric.fontBoundingBoxAscent + metric.fontBoundingBoxDescent
    size.height = 30

    const padding = this.getStylesheet().padding
    size.expand(padding.left + padding.right, padding.top + padding.bottom)
    this.setSize(size)
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _text: string = ''
  private _stylesheetMap: Map<ViewState, ButtonStylesheet> = new Map()
}
