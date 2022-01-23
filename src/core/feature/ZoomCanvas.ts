import { Vector } from 'src/base/geometry'
import { Feature, FeatureResult } from 'src/core/feature'
import { World } from 'src/core/World'

export class ZoomCanvasFeature extends Feature {
  protected onWheel(ev: WheelEvent, world: World): FeatureResult {
    if (!ev.ctrlKey) {
      return false
    }

    const t = new Vector(ev.clientX, ev.clientY)
    world.translate(t)
    const step = 0.1
    if (ev.deltaY > 0) {
      world.scale -= step
    } else {
      world.scale += step
    }
    world.translate(t.mul(-1))

    return true
  }
}
