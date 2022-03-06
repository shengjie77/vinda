import { clamp } from 'lodash'
import { Color } from 'src/base/color'
import { Matrix, Rect, Vector } from 'src/base/geometry'
import { FillStyle, StrokeStyle } from 'src/base/utils'
import { Entity, RectEntity } from 'src/core/entity'
import { hasRenderComponent, RenderComponent } from 'src/core/system'

export class World {
  public entities: Entity[] = []
  public selectionEntity: RectEntity = new RectEntity()

  constructor() {
    const fill = new FillStyle(Color.fromRGBA(24, 160, 251, 20))
    this.selectionEntity.fill = fill

    const stroke = new StrokeStyle(Color.fromRGB(24, 160, 251))
    this.selectionEntity.stroke = stroke
  }

  public translate(v: Vector) {
    this._matrix.translate(v.x, v.y)
  }

  public get scale() {
    return this._matrix.a
  }

  public set scale(v: number) {
    const s = clamp(v, 0.3, 3.0)
    this._matrix.scaleX = s
    this._matrix.scaleY = s
  }

  public get matrix() {
    return this._matrix
  }

  public addEntity(e: Entity) {
    this.entities.push(e)

    if (hasRenderComponent(e)) {
      this._renderComponents.push(e)
    }
  }

  public showSelectFrame(rect: Rect) {
    this.selectionEntity.visible = true
    this.selectionEntity.position = rect.topLeft
    this.selectionEntity.size = rect.size
  }

  public hideSelectFrame() {
    this.selectionEntity.visible = false
  }

  public get renderComponents(): RenderComponent[] {
    return this._renderComponents
  }

  /**
   * Convert a point in screen to a point a world
   *
   * @param pos
   */
  public mapToWorld(pos: Vector): Vector {
    return pos.transform(this._matrix.toInverse())
  }

  public mapToScreen(pos: Vector): Vector {
    return pos.transform(this.matrix)
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  /**
   * World coordinate to Screen coordinate
   */
  private _matrix = new Matrix()
  private _renderComponents: RenderComponent[] = []
}
