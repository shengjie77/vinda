import { Rect, Vector } from 'src/base/geometry'
import { tag } from 'src/base/utils'
import { Feature, FeatureResult } from 'src/core/feature'
import { World } from 'src/core/World'

const TAG = tag('SelectFeature')

export class SelectFeature extends Feature {
  protected onMouseDown(ev: MouseEvent, world: World): FeatureResult {
    if (this._from) {
      console.warn(TAG, 'mouse is already pressed')
      return false
    }

    const pos = Vector.fromMouseEvent(ev)
    this._from = world.mapToWorld(pos)
    console.info(TAG, `Show selection frame`)

    true
  }

  protected onMouseMove(ev: MouseEvent, world: World): FeatureResult {
    if (!this._from) {
      return false
    }

    this.updateSelection(this._from, Vector.fromMouseEvent(ev), world)

    true
  }

  protected onMouseUp(ev: MouseEvent, world: World): FeatureResult {
    if (!this._from) {
      return false
    }

    console.log(TAG, 'Hide selection frame')
    this.updateSelection(this._from, Vector.fromMouseEvent(ev), world)

    world.hideSelectFrame()
    this._from = undefined

    return true
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private updateSelection(from: Vector, to: Vector, world: World) {
    const rect = Rect.create({
      p1: from,
      p2: to,
    })

    world.entities.forEach((e) => {
      e.selected = e.intersectWith(rect)
    })

    world.showSelectFrame(rect)
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _from: Vector | undefined = undefined
}
