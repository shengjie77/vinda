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

  public getStylesheetForState(state: ViewState): ButtonStylesheet {
    return this._stylesheetMap.get(state)!
  }

  public setStylesheetForState(stylesheet: ButtonStylesheet, state: ViewState) {
    if (state === ViewState.Normal) {
      super.setStylesheet(stylesheet)
    }
    this._stylesheetMap.set(state, stylesheet)
    this.update()
  }

  public override paint(painter: Painter) {
    super.paint(painter)

    const ss =
      this.getStylesheetForState(this.getState()) ?? this.getStylesheet()
    paintText(painter, this._text, this.getContentRect(), ss.text)
  }

  // ------------------------------------------------------- //
  // -----------------  Protected Methods  ----------------- //
  // ------------------------------------------------------- //
  protected override setState(state: ViewState) {
    const oldState = this.getState()
    super.setState(state)

    if (oldState === state) {
      return
    }

    const ss = this.getStylesheetForState(state)
    if (ss) {
      super.setStylesheet(ss)
    }

    this.requestPaint()
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
    const font = this.getStylesheetForState(this.getState()).text.font

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
