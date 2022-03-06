import { Vector } from 'src/base/geometry'
import { Feature } from 'src/core/feature'
import { Control, Cursor } from 'src/core/feature/Control'
import { FeatureResult } from 'src/core/feature/Feature'
import { World } from 'src/core/World'

export class ControlFeature extends Feature {
  protected onMouseDown(ev: MouseEvent, world: World): FeatureResult {
    const pos = world.mapToWorld(Vector.fromMouseEvent(ev))
    const control = findControl(world, pos)

    if (!control) {
      return false
    }

    this._control = control
    this._control.onDragStart(pos)
    this.changeCursor(control.cursor)

    return true
  }

  protected onMouseMove(ev: MouseEvent, world: World): FeatureResult {
    const pos = world.mapToWorld(Vector.fromMouseEvent(ev))
    if (this._control) {
      this._control.onDragging(pos)
    } else {
      const control = findControl(world, pos)
      this.changeCursor(control ? control.cursor : Cursor.Default)
    }

    return false
  }

  protected onMouseUp(ev: MouseEvent, world: World): FeatureResult {
    if (this._control) {
      this._control.onDragFinish()
      this._control = undefined
    }

    return false
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private changeCursor(cursor: Cursor) {
    const canvas = document.getElementById('canvas')!
    canvas.style.cursor = cursor
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _control?: Control
}

function findControl(world: World, pos: Vector): Control | undefined {
  for (const e of world.entities) {
    if (!e.selected) {
      continue
    }

    const target = e.controls.find((c) => c.hitTest(pos))
    if (target) {
      return target
    }
  }

  return undefined
}
