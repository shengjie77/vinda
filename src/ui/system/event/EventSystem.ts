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
    function dispathEvent(view: View, ev: MouseEvent) {
      const pos = Vector.create({
        x: ev.clientX,
        y: ev.clientY,
      })

      view.getChildren().forEach((v) => dispathEvent(v, ev))

      const isMouseInOld = view.isMouseIn()
      const isMouseIn = view.getGlobalRect().contains(pos)
      if (isMouseIn !== isMouseInOld) {
        isMouseIn ? view.handleMouseEnter() : view.handleMouseLeave()
      }
    }

    container.addEventListener('mousemove', (ev: MouseEvent) => {
      this._provider.getViews().forEach((v) => dispathEvent(v, ev))
    })
  }

  private _provider: EventSystemProvider
}
