import { Vector } from 'src/common/geometry'

import { EventEntity } from './EventEntity'

export class EventSystem {
  public static create(container: HTMLElement) {
    return new EventSystem(container)
  }

  constructor(container: HTMLElement) {
    this._container = container
    this.bindEvents()
  }

  public addEntity(e: EventEntity) {
    this._entites.push(e)
  }

  private bindEvents() {
    const container = this._container

    container.addEventListener('mousedown', this.onMouseDown)
  }

  private onMouseDown = (ev: MouseEvent) => {
    const pos = Vector.create({
      x: ev.clientX,
      y: ev.clientY,
    })
    this._entites
      .filter((e) => e.getHitTestRect().contains(pos))
      .forEach((e) => e.mouseDown())
  }

  private _container: HTMLElement
  private _entites: EventEntity[] = []
}
