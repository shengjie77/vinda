import { Rect, Vector } from 'src/base/geometry'
import { tag } from 'src/base/utils'
import { Feature } from 'src/core/feature'
import { FeatureResult } from 'src/core/feature/Feature'
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

    const rect = Rect.create({
      p1: Vector.fromMouseEvent(ev),
      p2: this._from,
    })

    world.showSelectFrame(rect)

    true
  }

  protected onMouseUp(ev: MouseEvent, world: World): FeatureResult {
    if (!this._from) {
      return false
    }

    console.log(TAG, 'Hide selection frame')
    world.hideSelectFrame()
    this._from = undefined

    return true
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _from: Vector | undefined = undefined
}
