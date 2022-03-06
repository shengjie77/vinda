import { Vector } from 'src/base/geometry'
import { Feature, FeatureResult } from 'src/core/feature'
import { World } from 'src/core/World'

export class HoverFeature extends Feature {
  protected onMouseMove(ev: MouseEvent, world: World): FeatureResult {
    const pt = Vector.fromMouseEvent(ev)
    const ptInWorld = world.mapToWorld(pt)
    world.entities.forEach((e) => {
      e.hover = e.hitTest(ptInWorld)
    })

    return false
  }
}
