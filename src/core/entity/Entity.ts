import { StrokeStyle, FillStyle } from 'src/base/utils'
import { Vector, Scale, Angle, Size, Matrix } from 'src/base/geometry'

let EntityCount = 0

export abstract class Entity {
  public id: string = ''

  public position: Vector = new Vector()
  public scale: Scale = new Scale()
  public rotation: Angle = new Angle()

  public stroke?: StrokeStyle
  public fill?: FillStyle

  constructor() {
    this.id = `${++EntityCount}`
  }

  public set size(val: Size) {
    if (!val.isValid()) {
      console.warn(`size(${val}) is not valid.`)
      return
    }

    if (this.size.equalTo(val)) {
      return
    }

    const { x, y } = this.scale
    this.scale.x = x < 0 ? val.width * -1 : val.width
    this.scale.y = y < 0 ? val.height * -1 : val.height
  }

  public get size(): Size {
    return Size.create({
      width: this.scale.x,
      height: this.scale.y,
    })
  }

  public get matrix(): Matrix {
    return this.position
      .toMatrix()
      .append(this.scale.toMatrix())
      .append(this.rotation.toMatrix())
  }

  public abstract toPath(): Path2D

  public toString() {
    return `Entity(id:${this.id},position:${this.position},scale:${this.scale},rotation:${this.rotation})`
  }
}
