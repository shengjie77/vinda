import { World } from 'src/core/World'

export type FeatureResult = boolean | undefined

export type EventName = keyof HTMLElementEventMap

export abstract class Feature {
  public dispatchEvent(
    name: EventName,
    ev: MouseEvent,
    world: World
  ): FeatureResult {
    let result: FeatureResult = false

    switch (name) {
      case 'mousedown':
        result = this.onMouseDown(ev, world)
        break

      case 'mousemove':
        result = this.onMouseMove(ev, world)
        break

      case 'mouseup':
        result = this.onMouseUp(ev, world)
        break

      default:
        console.warn(`${name} is not handled.`)
        break
    }

    return result
  }

  protected onMouseDown(ev: MouseEvent, world: World): FeatureResult {
    return false
  }

  public onMouseMove(ev: MouseEvent, world: World): FeatureResult {
    return false
  }

  public onMouseUp(ev: MouseEvent, world: World): FeatureResult {
    return false
  }
}
