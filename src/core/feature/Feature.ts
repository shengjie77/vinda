export type FeatureResult = boolean | undefined

export type EventName = keyof HTMLElementEventMap

export abstract class Feature {
  public dispatchEvent(name: EventName, ev: MouseEvent): FeatureResult {
    let result: FeatureResult = false

    switch (name) {
      case 'mousedown':
        result = this.onMouseDown(ev)
        break

      case 'mousemove':
        result = this.onMouseMove(ev)
        break

      case 'mouseup':
        result = this.onMouseUp(ev)
        break

      default:
        console.warn(`${name} is not handled.`)
        break
    }

    return result
  }

  protected onMouseDown(ev: MouseEvent): FeatureResult { 
    return false
  }

  public onMouseMove(ev: MouseEvent): FeatureResult {
    return false
  }

  public onMouseUp(ev: MouseEvent): FeatureResult {
    return false
  }
}