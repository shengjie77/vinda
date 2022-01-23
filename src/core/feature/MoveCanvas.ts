import { Vector } from 'src/base/geometry'
import { Feature, FeatureResult } from 'src/core/feature'
import { World } from 'src/core/World'

export class MoveCanvasFeature extends Feature {
  protected onWheel(ev: WheelEvent, world: World): FeatureResult {
    if (ev.ctrlKey) {
      return false
    }

    const v = new Vector(-ev.deltaX, -ev.deltaY).mul(1 / world.scale)
    world.translate(v)

    return false
  }
}
