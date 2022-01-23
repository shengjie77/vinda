import { clamp } from 'lodash'
import { Matrix, Vector } from 'src/base/geometry'
import { Entity } from 'src/core/entity'

export class World {
  public entities: Entity[] = []

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
}
