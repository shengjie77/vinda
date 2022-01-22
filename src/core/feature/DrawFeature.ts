import { assertIsDefined } from 'src/base/utils'
import { Rect, Vector } from 'src/base/geometry'
import { RectEntity } from 'src/core/entity'
import { Feature, FeatureResult } from 'src/core/feature'
import { World } from 'src/core/World'

export class DrawFeature extends Feature {
  public static rect(): DrawFeature {
    return new DrawFeature(new RectDrawer())
  }

  constructor(drawer: Drawer) {
    super()

    this._drawer = drawer
  }

  protected onMouseDown(ev: MouseEvent, world: World): FeatureResult {
    if (this._isStarted) {
      return false
    }

    this._isStarted = true

    const pos = world.mapToWorld(getVectorFromEvent(ev))
    this._drawer.start(pos, world)

    return true
  }

  public onMouseMove(ev: MouseEvent, world: World): FeatureResult {
    if (!this._isStarted) {
      return false
    }

    const pos = world.mapToWorld(getVectorFromEvent(ev))
    this._drawer.update(pos, world)

    return true
  }

  public onMouseUp(ev: MouseEvent, world: World): FeatureResult {
    if (!this._isStarted) {
      return false
    }

    const pos = world.mapToWorld(getVectorFromEvent(ev))
    this._drawer.finish(pos, world)

    this._isStarted = false

    return true
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _drawer: Drawer
  private _isStarted = false
}

function getVectorFromEvent(ev: MouseEvent) {
  return new Vector(ev.clientX, ev.clientY)
}

interface Drawer {
  start(pos: Vector, world: World): void
  update(pos: Vector, world: World): void
  finish(pos: Vector, world: World): void
}

class RectDrawer implements Drawer {
  public start(pos: Vector, world: World): void {
    console.log(`[RectDrawer] start: ${pos}`)

    this.from = pos

    this.entity = new RectEntity()
    world.addEntity(this.entity)
  }

  public update(pos: Vector, world: World): void {
    const rect = Rect.create({
      p1: this.from,
      p2: pos,
    })

    assertIsDefined(this.entity)
    this.entity.position = rect.topLeft
    this.entity.size = rect.size
  }

  public finish(pos: Vector, world: World): void {
    console.log(`[RectDrawer] finish: ${pos}`)

    this.entity = undefined
    this.from = new Vector()
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  entity?: RectEntity
  from: Vector = new Vector()
}
