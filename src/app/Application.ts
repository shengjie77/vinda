import { View, MainWindow, Button } from 'src/ui/view'
import { Color } from 'src/common/color'
import { Size } from 'src/common/geometry'
import { FluentDesignTheme } from 'src/ui/theme'
import { ViewState } from 'src/ui/view/ViewState'
import { ViewStylesheet } from 'src/ui/stylesheet'
import { LayoutValue } from 'src/ui/style'

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
    // const container = document.getElementById('container') as HTMLElement
    // mountUI(container);
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    fillScreen(canvas)

    this.drawSomething()
  }

  private drawSomething() {
    const view = View.create()
    // view.background.color = Color.RED
    // const layout = RowLayout.create()
    // layout.setCrossAxisAlignment(CrossAxisAlignment.Center)
    // layout.setMainAxisAlignment(MainAxisAlignment.SpaceBetween)
    // view.setLayout(layout)
    const ss = ViewStylesheet.create()
    ss.layout.type = LayoutValue.Row
    ss.background.color = Color.fromHex(0x8a8886)
    view.setStylesheet(ss)
    view.setSize(Size.create({ width: 512, height: 256 }))

    const btn1 = createButton()
    view.addChild(btn1)
    const btn2 = createButton()
    view.addChild(btn2)
    const btn3 = createButton()
    view.addChild(btn3)

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

function createButton() {
  const theme = new FluentDesignTheme()
  const btn = Button.create()
  btn.setText('Primary')
  // btn.setPosition(Vector.create({ x: 100, y: 30 }))
  btn.setStylesheetForState(theme.button.primaryNormalStyle, ViewState.Normal)
  btn.setStylesheetForState(theme.button.primaryHoverStyle, ViewState.Hover)
  btn.setStylesheetForState(theme.button.primaryActiveStyle, ViewState.Active)
  btn.setStylesheetForState(
    theme.button.primaryDisabledStyle,
    ViewState.Disabled
  )

  return btn
}
