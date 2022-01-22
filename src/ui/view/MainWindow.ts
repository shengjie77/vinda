import { PaintSystem, PaintSystemProvider } from 'src/ui/system/paint'
import { LayoutSystem, LayoutSystemProvider } from 'src/ui/system/layout'
import { EventSystem, EventSystemProvider } from 'src/ui/system/event'
import { View } from 'src/ui/view'

import { ViewHost } from './ViewHost'
import { allowUnusedLocal } from 'src/base'

export class MainWindow
  implements
    ViewHost,
    EventSystemProvider,
    PaintSystemProvider,
    LayoutSystemProvider
{
  public static create(canvas: HTMLCanvasElement) {
    return new MainWindow(canvas)
  }

  public addView(view: View) {
    this.traverse(view)
    this._views.push(view)
    this.update()
  }

  public getContainer(): HTMLCanvasElement {
    return this._canvas
  }

  public getViews(): View[] {
    return this._views
  }

  public requestPaint() {
    this._needPaint = true
  }

  public requestLayout() {
    this._needLayout = true
    this._needPaint = true
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._paintSystem = PaintSystem.createFromCanvas(this)
    this._layoutSystem = LayoutSystem.create(this)
    this._eventSystem = EventSystem.create(this)

    allowUnusedLocal(this._eventSystem)

    this._views = []
    this.handleFrame()

    window.addEventListener('resize', () => this.update())
  }

  private update() {
    this.requestLayout()
    this.requestPaint()
  }

  private traverse(view: View) {
    view.setViewHost(this)
    view.getChildren().forEach((v) => this.traverse(v))
  }

  private handleFrame = () => {
    requestAnimationFrame(this.handleFrame)

    if (this._needLayout) {
      this._layoutSystem.build()
      this._needLayout = false
    }

    if (this._needPaint) {
      this._paintSystem.paint()
      this._needPaint = false
    }
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _paintSystem: PaintSystem
  private _layoutSystem: LayoutSystem
  private _eventSystem: EventSystem
  private _views: View[]
  private _canvas: HTMLCanvasElement
  private _needPaint: boolean = false
  private _needLayout: boolean = false
}
