import { PaintSystem, PaintSystemProvider } from 'src/ui/system/paint'
import { LayoutSystem } from 'src/ui/system/layout'
import { EventSystem, EventSystemProvider } from 'src/ui/system/event'
import { View } from 'src/ui/view'
import { Vector } from 'src/common/geometry'

import { ViewHost } from './ViewHost'

export class MainWindow
  implements EventSystemProvider, PaintSystemProvider, ViewHost
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
    this._paintSystem.markDirty()
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._paintSystem = PaintSystem.createFromCanvas(this)
    this._layoutSystem = LayoutSystem.create()
    this._eventSystem = EventSystem.create(this)

    this._views = []
  }

  private update() {
    this.requestPaint()
  }

  private traverse(view: View) {
    view.setViewHost(this)
    view.getChildren().forEach((v) => this.traverse(v))
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _paintSystem: PaintSystem
  private _layoutSystem: LayoutSystem
  private _eventSystem: EventSystem

  private _views: View[]
  private _canvas: HTMLCanvasElement
}
