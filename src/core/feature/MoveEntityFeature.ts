import { Vector } from 'src/base/geometry'
import { MouseEventButton } from 'src/base/utils'
import { Entity } from 'src/core/entity'
import { Feature, FeatureResult } from 'src/core/feature'
import { World } from 'src/core/World'

export class MoveEntityFeature extends Feature {
  protected onMouseDown(ev: MouseEvent, world: World): FeatureResult {
    if (ev.button !== MouseEventButton.Left) {
      return false
    }

    const pos = world.mapToWorld(Vector.fromMouseEvent(ev))
    const entity = world.entities.find((e) => e.hitTest(pos))
    if (!entity) {
      return false
    }

    this._selectedEntity = entity
    this._from = pos

    return true
  }

  protected onMouseMove(ev: MouseEvent, world: World): FeatureResult {
    if (!this._selectedEntity) {
      return false
    }

    const cur = world.mapToWorld(Vector.fromMouseEvent(ev))
    const offset = cur.sub(this._from)
    this._selectedEntity.translate(offset)
    this._from = cur

    return true
  }

  protected onMouseUp(ev: MouseEvent, world: World): FeatureResult {
    if (this._selectedEntity) {
      this._selectedEntity = undefined
      this._from = new Vector()
    }

    return false
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _selectedEntity?: Entity = undefined
  private _from: Vector = new Vector()
}
