import { Painter } from 'src/ui/painter'
import { ButtonStylesheet } from 'src/ui/stylesheet'
import { Size } from 'src/base/geometry'

import { View } from './View'
import { paintText } from './utils'
import { ViewState } from './ViewState'

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

  public setEnable(enalbe: boolean) {
    this.setState(enalbe ? ViewState.Normal : ViewState.Disabled)
  }

  public getEnable(): boolean {
    return this.getState() !== ViewState.Disabled
  }

  public getStylesheetForState(state: ViewState): ButtonStylesheet {
    return this._stylesheetMap.get(state)!
  }

  public setStylesheetForState(stylesheet: ButtonStylesheet, state: ViewState) {
    if (state === ViewState.Normal) {
      super.setStylesheet(stylesheet)
    }
    this._stylesheetMap.set(state, stylesheet)
  }

  public override paint(painter: Painter) {
    super.paint(painter)

    const ss =
      this.getStylesheetForState(this.getState()) ?? this.getStylesheet()
    paintText(painter, this._text, this.getContentRect(), ss.text)
  }

  public override getDefaultSize(): Size {
    return this.calculateDefaultSize()
  }

  // ------------------------------------------------------- //
  // -----------------  Protected Methods  ----------------- //
  // ------------------------------------------------------- //
  protected override onStateChanged(prevState: ViewState) {
    const ss = this.getStylesheetForState(this.getState())
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

  private calculateDefaultSize() {
    const font = this.getStylesheetForState(this.getState()).text.font

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    ctx.font = font.toCSSString()
    const metric: any = ctx.measureText(this._text)
    const size = Size.create()
    size.width = metric.width
    size.height = 30

    const padding = this.getStylesheet().padding
    size.expand(padding.left + padding.right, padding.top + padding.bottom)
    return size
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _text: string = ''
  private _stylesheetMap: Map<ViewState, ButtonStylesheet> = new Map()
}
