import { View, MainWindow, Label, Button } from 'src/ui/view'
import {
  ColumnLayout,
  CrossAxisAlignment,
  LayoutSystem,
  MainAxisAlignment,
  RowLayout,
  SizePolicy,
} from 'src/ui/system/layout'
import { Color } from 'src/common/color'
import { Rect, Size, Vector } from 'src/common/geometry'
import { FluentDesignTheme } from 'src/ui/theme'
import { ViewState } from 'src/ui/view/ViewState'

export class Application {
  public static create(): Application {
    return new Application()
  }

  constructor() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement

    this._mainWindow = MainWindow.create(canvas)
  }

  public run() {
    console.log('Application is running...')
    this.test()
  }

  // ------------------------------------------------------- //
  // ---------------  Private Section Below  --------------- //
  // ------------------------------------------------------- //

  private test() {
    const container = document.getElementById('container') as HTMLElement
    // mountUI(container);
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    fillScreen(canvas)

    this.drawSomething()
  }

  private drawSomething() {
    const view = View.create()
    // view.background.color = Color.RED
    const layout = RowLayout.create()
    layout.setCrossAxisAlignment(CrossAxisAlignment.Center)
    layout.setMainAxisAlignment(MainAxisAlignment.SpaceBetween)
    view.setLayout(layout)
    view.setSize(Size.create({ width: 512, height: 256 }))

    const theme = new FluentDesignTheme()
    const btn = Button.create()
    btn.setText('Primary')
    btn.setPosition(Vector.create({ x: 100, y: 30 }))
    btn.setStylesheetForState(theme.button.primaryNormalStyle, ViewState.Normal)
    btn.setStylesheetForState(theme.button.primaryHoverStyle, ViewState.Hover)
    btn.setStylesheetForState(theme.button.primaryActiveStyle, ViewState.Active)
    btn.setStylesheetForState(
      theme.button.primaryDisabledStyle,
      ViewState.Disabled
    )
    view.addChild(btn)

    this._mainWindow.addView(view)
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _mainWindow: MainWindow
}

function fillScreen(canvas: HTMLCanvasElement) {
  canvas.style.height = '100vh'
  const ratio = window.devicePixelRatio
  canvas.width = canvas.clientWidth * ratio
  canvas.height = canvas.clientHeight * ratio
}
