import { Angle, Matrix, Rect, Scale, Vector } from 'src/base/geometry'
import { Entity } from 'src/core/entity'

export enum Cursor {
  Default = 'default',
  // NResize = 'n-resize',
  // EResize = 'e-resize',
  // SResize = 's-resize',
  // WResize = 'w-resize',
  // NEResize = 'ne-resize',
  // NWResize = 'nw-resize',
  // SEResize = 'se-resize',
  EWResize = 'ew-resize',
  NSResize = 'ns-resize',
  NESWResize = 'nesw-resize',
  NWSEResize = 'nwse-resize',
  Grabbing = 'grabbing',
}

export class Control {
  public static TopLeftResize(e: Entity): Control {
    return new Control(e, {
      cursor: Cursor.NWSEResize,
      position: new Vector(0, 0),
      update: (
        e: Entity,
        from: Vector,
        to: Vector,
        oldTransform: Transform
      ) => {
        const v = to.sub(from)
        e.position = oldTransform.position.add(v)
        e.scale = oldTransform.scale.toVector().sub(v).toScale()
      },
    })
  }

  public static TopRightResize(e: Entity): Control {
    return new Control(e, {
      cursor: Cursor.NESWResize,
      position: new Vector(e.width, 0),
      update: (
        e: Entity,
        from: Vector,
        to: Vector,
        oldTransform: Transform
      ) => {
        const v = to.sub(from)
        e.position.y = oldTransform.position.y + v.y
        e.scale.x = oldTransform.scale.x + v.x
        e.scale.y = oldTransform.scale.y - v.y
      },
    })
  }

  public static BottomLeftResize(e: Entity): Control {
    return new Control(e, {
      cursor: Cursor.NESWResize,
      position: new Vector(0, e.height),
      update: (
        e: Entity,
        from: Vector,
        to: Vector,
        oldTransform: Transform
      ) => {
        const v = to.sub(from)
        e.position.x = oldTransform.position.x + v.x
        e.scale.x = oldTransform.scale.x - v.x
        e.scale.y = oldTransform.scale.y + v.y
      },
    })
  }

  public static BottomRightResize(e: Entity): Control {
    return new Control(e, {
      cursor: Cursor.NWSEResize,
      position: new Vector(e.width, e.height),
      update: (
        e: Entity,
        from: Vector,
        to: Vector,
        oldTransform: Transform
      ) => {
        const v = to.sub(from)
        e.scale = oldTransform.scale.toVector().add(v).toScale()
      },
    })
  }

  public static Rotate(e: Entity): Control {
    return new Control(e, {
      cursor: Cursor.Grabbing,
      position: new Vector(e.width * 0.5, -20),
      update: (
        e: Entity,
        from: Vector,
        to: Vector,
        oldTransform: Transform
      ) => {
        const center = new Vector(
          oldTransform.scale.x * 0.5,
          oldTransform.scale.y * 0.5
        )
        const vFrom = from.sub(center)
        const vTo = to.sub(center)
        const delta = vFrom.angleTo(vTo)
        const oldAngle = oldTransform.rotation.clone()
        oldAngle.radian = -oldAngle.radian
        const newAngle = Angle.fromRadian(oldAngle.radian + delta.radian)
        const m = oldTransform.position
          .toMatrix()
          .scale(
            oldTransform.scale.x >= 0 ? 1 : -1,
            oldTransform.scale.y >= 0 ? 1 : -1
          )
          .translate(center.x, center.y)
          .rotate(newAngle)
          .translate(-center.x, -center.y)
        e.position = new Vector().transform(m)
        e.rotation.radian = oldTransform.rotation.radian + delta.radian
      },
    })
  }

  constructor(e: Entity, delegate: ControlDelegate) {
    this._entity = e
    this._delegate = delegate
  }

  public get cursor(): Cursor {
    return this._delegate.cursor
  }

  public get rect(): Rect {
    const v = 10
    const center = this._delegate.position
    const rect = Rect.create({
      x: center.x - v,
      y: center.y - v,
      width: v * 2,
      height: v * 2,
    })
    return rect
  }

  public hitTest(pos: Vector): boolean {
    const ptInEntity = pos.transform(
      this._entity.matrixWithoutScale.toInverse()
    )

    return this.rect.contains(ptInEntity)
  }

  public onDragStart(pos: Vector): void {
    this._from = this._entity.mapWorldToEntity(pos)
    this._oldPosition = this._entity.position.clone()
    this._oldScale = this._entity.scale.clone()
    this._oldRotation = this._entity.rotation.clone()
    this._matrix = this._entity.matrixWithoutScale.toInverse()
  }

  public onDragging(pos: Vector): void {
    const to = pos.transform(this._matrix)

    this._delegate.update(this._entity, this._from, to, {
      position: this._oldPosition.clone(),
      scale: this._oldScale.clone(),
      rotation: this._oldRotation.clone(),
    })
  }

  public onDragFinish(): void {}

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _entity: Entity
  private _matrix: Matrix = new Matrix()
  private _from: Vector = new Vector()
  private _oldPosition: Vector = new Vector()
  private _oldRotation: Angle = new Angle()
  private _oldScale: Scale = new Scale()
  private _delegate: ControlDelegate
}

interface ControlDelegate {
  cursor: Cursor
  position: Vector
  update(
    entity: Entity,
    from: Vector,
    to: Vector,
    oldTransform: Transform
  ): void
}

interface Transform {
  position: Vector
  scale: Scale
  rotation: Angle
}
