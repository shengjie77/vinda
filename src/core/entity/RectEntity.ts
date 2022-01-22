import { Entity } from 'src/core/entity'

export class RectEntity extends Entity {
  public toPath(): Path2D {
    const path = new Path2D()
    path.rect(0, 0, 1, 1)

    return path
  }
}
