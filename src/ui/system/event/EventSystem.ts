import { Vector } from 'src/base/geometry'
import { View } from 'src/ui/view'

export interface EventSystemProvider {
  getContainer(): HTMLElement
  getViews(): View[]
}

export class EventSystem {
  public static create(provider: EventSystemProvider) {
    return new EventSystem(provider)
  }

  constructor(provider: EventSystemProvider) {
    this._provider = provider
    this.bindEvents()
  }

  private bindEvents() {
    const container = this._provider.getContainer()

    container.addEventListener('mousemove', this.dispatchMouseMoveEvent)
    container.addEventListener('mousedown', this.dispatchMouseDownEvent)
    container.addEventListener('mouseup', this.dispatchMouseUpEvent)
  }

  private dispatchMouseMoveEvent = (ev: MouseEvent) => {
    this._provider.getViews().forEach((v) => this.dispatchEvent(v, ev))
  }

  private dispatchMouseDownEvent = (ev: MouseEvent) => {
    function dispatchDown(view: View, ev: MouseEvent) {
      const pos = Vector.create({
        x: ev.clientX,
        y: ev.clientY,
      })

      if (!view.getGlobalRect().contains(pos)) {
        return
      }

      view.getChildren().forEach((v) => dispatchDown(v, ev))
      view.handleMouseDown(ev)
    }

    this._provider.getViews().forEach((v) => dispatchDown(v, ev))
  }

  private dispatchMouseUpEvent = (ev: MouseEvent) => {
    function dispatch(view: View, ev: MouseEvent) {
      const pos = Vector.create({
        x: ev.clientX,
        y: ev.clientY,
      })

      if (!view.getGlobalRect().contains(pos)) {
        return
      }

      view.getChildren().forEach((v) => dispatch(v, ev))
      view.handleMouseUp(ev)
    }

    this._provider.getViews().forEach((v) => dispatch(v, ev))
  }

  private dispatchEvent = (view: View, ev: MouseEvent) => {
    const pos = Vector.create({
      x: ev.clientX,
      y: ev.clientY,
    })

    let handled = false

    view.getChildren().forEach((v) => {
      const child_handled = this.dispatchEvent(v, ev)
      handled = handled || child_handled
    })

    const isMouseInOld = view.isMouseIn()
    const isMouseIn = view.getGlobalRect().contains(pos)
    if (isMouseIn !== isMouseInOld) {
      isMouseIn ? view.handleMouseEnter() : view.handleMouseLeave()
    }

    if (!handled && isMouseIn) {
      this._provider.getContainer().style.cursor =
        view.getStylesheet().cursor.type
    }

    handled = handled || isMouseIn

    return handled
  }

  private _provider: EventSystemProvider
}
