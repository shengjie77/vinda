import { Vector } from 'src/base/geometry'
import { Entity } from 'src/core/entity'

export class World {
  public entities: Entity[] = []

  public addEntity(e: Entity) {
    this.entities.push(e)
  }

  /**
   * Convert a point in screen to a point a world
   *
   * @param pos
   */
  public mapToWorld(pos: Vector): Vector {
    // TODO
    return pos.clone()
  }
}
