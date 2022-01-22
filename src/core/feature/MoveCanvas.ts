import { Vector } from 'src/base/geometry'
import { Feature } from 'src/core/feature'
import { FeatureResult } from 'src/core/feature/Feature'
import { World } from 'src/core/World'

export class MoveCanvasFeature extends Feature {
  protected onWheel(ev: WheelEvent, world: World): FeatureResult {
    const v = new Vector(-ev.deltaX, -ev.deltaY)
    world.translate(v)

    return false
  }
}
