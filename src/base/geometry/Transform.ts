import { Cloneable, cloneProperty, Equalable } from 'src/base/types'
import { Vector, Angle, Matrix } from 'src/base/geometry'

/**
 * Transform order: scale -> rotate -> translate
 *
 * @export
 * @class Transform
 * @implements {Cloneable}
 */
export class Transform extends Cloneable implements Equalable {
  public static fromIdentity(): Transform {
    return new Transform()
  }

  @cloneProperty()
  public translation: Vector = new Vector()

  @cloneProperty()
  public scale: Vector = new Vector(1, 1)

  @cloneProperty()
  public rotation: Angle = new Angle()

  public translate(tx: number, ty: number) {
    this.translation.x += tx
    this.translation.y += ty
  }

  public toMatrix(): Matrix {
    return Matrix.fromIdentity()
      .translate(this.translation.x, this.translation.y)
      .rotate(this.rotation)
      .scale(this.scale.x, this.scale.y)
  }

  public equalTo(t: Transform): boolean {
    return (
      this.translation.equalTo(t.translation) &&
      this.scale.equalTo(t.scale) &&
      this.rotation.equalTo(t.rotation)
    )
  }
}
