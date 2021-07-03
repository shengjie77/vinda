import { PaintSystem } from 'src/ui/system/paint'
import { LayoutSystem } from 'src/ui/system/layout'
import { EventSystem } from 'src/ui/system/event'
import { View } from 'src/ui/view'

export class MainWindow {
  public static create(canvas: HTMLCanvasElement) {
    return new MainWindow(canvas)
  }

  public addView(view: View) {
    this._views.push(view)
    this.update()
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private constructor(canvas: HTMLCanvasElement) {
    this._paintSystem = PaintSystem.createFromCanvas(canvas)
    this._layoutSystem = LayoutSystem.create()
    this._eventSystem = EventSystem.create(canvas)

    this._views = []
  }

  private update() {
    this._paintSystem.paint(this._views)
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _paintSystem: PaintSystem
  private _layoutSystem: LayoutSystem
  private _eventSystem: EventSystem

  private _views: View[]
}
