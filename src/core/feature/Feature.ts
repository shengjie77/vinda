import { World } from 'src/core/World'

export type FeatureResult = boolean | undefined

export type EventName = keyof HTMLElementEventMap

export abstract class Feature {
  public dispatchEvent(
    name: EventName,
    ev: HTMLElementEventMap[EventName],
    world: World
  ): FeatureResult {
    let result: FeatureResult = false

    switch (name) {
      case 'mousedown':
        // TODO: Remove the `as`
        result = this.onMouseDown(ev as MouseEvent, world)
        break

      case 'mousemove':
        result = this.onMouseMove(ev as MouseEvent, world)
        break

      case 'mouseup':
        result = this.onMouseUp(ev as MouseEvent, world)
        break

      case 'wheel':
        result = this.onWheel(ev as WheelEvent, world)
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

  protected onMouseMove(ev: MouseEvent, world: World): FeatureResult {
    return false
  }

  protected onMouseUp(ev: MouseEvent, world: World): FeatureResult {
    return false
  }

  protected onWheel(ev: WheelEvent, world: World): FeatureResult {
    return false
  }
}
