import { StrokeStyle, FillStyle } from 'src/base/utils'
import { Vector, Scale, Angle, Size, Matrix, Rect } from 'src/base/geometry'

let EntityCount = 0

export abstract class Entity {
  public id: string = ''

  public position: Vector = new Vector()
  public scale: Scale = new Scale()
  public rotation: Angle = new Angle()

  public stroke?: StrokeStyle
  public fill?: FillStyle

  public hover: boolean = false
  public visible: boolean = false
  public selected: boolean = false

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

  public get x() {
    return this.position.x
  }

  public get y() {
    return this.position.y
  }

  public get width() {
    return this.size.width
  }

  public get height() {
    return this.size.height
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

  public identicalTo(e: Entity) {
    return this.id === e.id
  }

  public hitTest(pos: Vector): boolean {
    const ptInEntity = pos.clone().transform(this.matrix.toInverse())
    return Rect.create({
      x: 0,
      y: 0,
      width: 1,
      height: 1,
    }).contains(ptInEntity)
  }

  public intersectWith(rect: Rect): boolean {
    const bounds = Rect.create({
      x: this.position.x,
      y: this.position.y,
      width: this.width,
      height: this.height,
    })

    return bounds.intersects(rect)
  }

  public translate(trans: Vector) {
    this.position = this.position.add(trans)
  }
}
