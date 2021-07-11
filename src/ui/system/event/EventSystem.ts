import { Vector } from 'src/common/geometry'
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
    this._provider.getViews().forEach((v) => dispatchEvent(v, ev))
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

  private _provider: EventSystemProvider
}

function dispatchEvent(view: View, ev: MouseEvent) {
  const pos = Vector.create({
    x: ev.clientX,
    y: ev.clientY,
  })

  view.getChildren().forEach((v) => dispatchEvent(v, ev))

  const isMouseInOld = view.isMouseIn()
  const isMouseIn = view.getGlobalRect().contains(pos)
  if (isMouseIn !== isMouseInOld) {
    isMouseIn ? view.handleMouseEnter() : view.handleMouseLeave()
  }
}
