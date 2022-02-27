import { Vector } from 'src/base/geometry'
import { Feature, FeatureResult } from 'src/core/feature'
import { World } from 'src/core/World'

export class MoveCanvasFeature extends Feature {
  protected onWheel(ev: WheelEvent, world: World): FeatureResult {
    if (ev.ctrlKey) {
      return false
    }

    const ratio = 0.5
    const dx = -ev.deltaX * ratio
    const dy = -ev.deltaY * ratio
    const v = new Vector(dx, dy).mul(1 / world.scale)
    world.translate(v)

    return false
  }
}
