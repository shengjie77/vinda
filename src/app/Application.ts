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
    btn.setStylesheet(theme.button.primaryNormalStyle, ViewState.Normal)
    btn.setStylesheet(theme.button.primaryHoverStyle, ViewState.Hover)
    view.addChild(btn)

    // const btn_hover = Button.create()
    // btn_hover.setText('Primary Hover')
    // btn_hover.setPosition(Vector.create({ x: 200, y: 30 }))
    // btn_hover.setStylesheet(theme.button.primaryHoverStyle)
    // view.addChild(btn_hover)

    // const btn_pressed = Button.create()
    // btn_pressed.setText('Primary Pressed')
    // btn_pressed.setPosition(Vector.create({ x: 350, y: 30 }))
    // btn_pressed.setStylesheet(theme.button.primaryPressedStyle)
    // view.addChild(btn_pressed)

    // const btn_disabled = Button.create()
    // btn_disabled.setText('Primary Pressed')
    // btn_disabled.setPosition(Vector.create({ x: 500, y: 30 }))
    // btn_disabled.setStylesheet(theme.button.primaryDisabledStyle)
    // view.addChild(btn_disabled)

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
