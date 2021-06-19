import { Painter } from 'src/core/painter'
import {
  Matrix,
  Rect,
  RoundedRect,
  Transform,
  Size,
  Vector,
} from 'src/common/geometry'
import { PaintEntity } from 'src/core/system/paint'
import { LayoutEntity, Layout, ColumnLayout } from 'src/core/system/layout'
import { Optional } from 'src/common'

import { Background as BackgroundStyle } from './Background'
import { Border as BorderStyle } from './Border'

export class View implements PaintEntity, LayoutEntity {
  // ------------------------------------------------------- //
  // ------------------  Static Methods  ------------------- //
  // ------------------------------------------------------- //
  public static create(): View {
    return new View()
  }

  // ------------------------------------------------------- //
  // -------------------  Public Methods  ------------------ //
  // ------------------------------------------------------- //
  public setSize(v: Size) {
    this._size = v
  }

  public getSize(): Size {
    return this._size.clone()
  }

  public setPosition(v: Vector) {
    this._transform.translation = v
  }

  public getPosition(): Vector {
    return this._transform.translation
  }

  public layout() {
    this.getLayout().build(this)
  }

  public setLayout(layout: Layout) {
    this._layout = layout
  }

  public getLayout() {
    return this._layout
  }

  public getLayoutEntities(): LayoutEntity[] {
    return this._children
  }

  public setX(v: number) {
    this._transform.translation.x = v
  }

  public getX(): number {
    return this._transform.translation.x
  }

  public setY(v: number) {
    this._transform.translation.y = v
  }

  public getY(): number {
    return this._transform.translation.y
  }

  public setWidth(w: number) {
    const size = this.getSize()
    size.width = w
    this.setSize(size)
  }

  public getWidth(): number {
    return this.getSize().width
  }

  public setHeight(h: number) {
    const size = this.getSize()
    size.height = h
    this.setSize(size)
  }

  public getHeight(): number {
    return this.getSize().height
  }

  public addChild(child: View) {
    child._parent = this
    this._children.push(child)
  }

  public paint(painter: Painter) {
    this.paintBackground(painter, this.background)
    this.paintBorder(painter, this.border)
  }

  public getChildPaintEntites() {
    return this._children
  }

  public getPaintRect() {
    const matrix = this.getMatrix()

    const topLeft = Vector.create().transform(matrix)
    const bottomRight = Vector.create({
      x: this.getWidth(),
      y: this.getHeight(),
    }).transform(matrix)
    return Rect.create({ topLeft, bottomRight })
  }

  public border: BorderStyle = BorderStyle.create()
  public background: BackgroundStyle = BackgroundStyle.create()

  public rect: Rect = new Rect()

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private getMatrix(): Matrix {
    const matrix = this._transform.toMatrix()

    if (!this._parent) {
      return matrix
    }

    return this._parent.getMatrix().append(matrix)
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _children: View[] = []
  private _parent: Optional<View> = undefined
  private _transform: Transform = Transform.fromIdentity()
  private _size: Size = Size.create()
  private _layout: Layout = ColumnLayout.create()

  public onPaint(painter: Painter) {
    this.paintBackground(painter, this.background)
    this.paintBorder(painter, this.border)
  }

  // ------------------------------------------------------- //
  // ---------------  Private Section Below  --------------- //
  // ------------------------------------------------------- //

  private paintBorder(painter: Painter, border: BorderStyle) {
    painter.save()
    const outerRounedRect = new RoundedRect(
      {
        x: this.rect.x,
        y: this.rect.y,
        width: this.rect.width,
        height: this.rect.height,
      },
      this.border.radius
    )
    const outerPath = outerRounedRect.toPath2D()
    const innerRoundedRect = outerRounedRect.clone().shrink(this.border.width)
    innerRoundedRect.radius =
      this.border.radius - this.border.width >= 0
        ? this.border.radius - this.border.width
        : 0
    const innerPath = innerRoundedRect.toPath2D()
    const clipPath = new Path2D()
    clipPath.addPath(outerPath)
    clipPath.addPath(innerPath)
    painter.clipPath = clipPath
    painter.brush.color = border.color
    painter.fillRoundedRect(this.getPaintRect(), border.radius, border.radius)

    painter.restore()
  }

  private paintBackground(painter: Painter, background: BackgroundStyle) {
    painter.save()
    painter.brush.color = background.color
    painter.fillRoundedRect(
      this.getPaintRect(),
      this.border.radius,
      this.border.radius
    )
    painter.restore()
  }
}
