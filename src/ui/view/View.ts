import { Painter } from 'src/ui/painter'
import {
  Matrix,
  Rect,
  RoundedRect,
  Transform,
  Size,
  Vector,
  Line,
} from 'src/base/geometry'
import { Optional } from 'src/base/types'
import { BackgroundStyle, BorderStyle } from 'src/ui/style'
import { ViewStylesheet } from 'src/ui/stylesheet'

import { ViewState } from './ViewState'
import { ViewHost, EmptyViewHost } from './ViewHost'
import { ViewStateMachine } from './ViewStateMachine'
import { Color } from 'src/base/color'
import { allowUnusedLocal } from 'src/base'

export class View {
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

  public getDefaultSize(): Size {
    return Size.create()
  }

  public getPreferredSize(): Size {
    const size = Size.create()
    const defaultSize = this.getDefaultSize()
    const layout = this.getStylesheet().layout
    size.width = layout.width ?? defaultSize.width
    size.height = layout.height ?? defaultSize.height
    return size
  }

  public setPosition(v: Vector) {
    this._transform.translation = v
  }

  public getPosition(): Vector {
    return this._transform.translation
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

  public getTransform() {
    return this._transform
  }

  public getMainAxisAlign() {
    return this.getStylesheet().layout.mainAxisAlign
  }

  public getCrossAxisAlign() {
    return this.getStylesheet().layout.crossAxisAlign
  }

  public addChild(child: View) {
    child._parent = this
    this._children.push(child)
  }

  public paint(painter: Painter) {
    this.paintBackground(painter, this.getStylesheet().background)
    this.paintBorder(painter, this.getStylesheet().border)

    allowUnusedLocal(this.paintRuler)
    // this.paintRuler(painter)
  }

  public getChildren() {
    return this._children
  }

  public getHitTestRect(): Rect {
    return this.getGlobalRect()
  }

  public getLocalRect(): Rect {
    const rect = Rect.create()
    rect.width = this.getWidth()
    rect.height = this.getHeight()

    return rect
  }

  public getContentRect(): Rect {
    const rect = this.getLocalRect()
    const padding = this.getStylesheet().padding
    rect.shrink({
      top: padding.top,
      bottom: padding.bottom,
      left: padding.left,
      right: padding.right,
    })

    return rect
  }

  public getGlobalRect(): Rect {
    const matrix = this.getMatrix()
    const topLeft = Vector.create().transform(matrix)
    const bottomRight = Vector.create({
      x: this.getWidth(),
      y: this.getHeight(),
    }).transform(matrix)
    return Rect.create({ p1: topLeft, p2: bottomRight })
  }

  public getStylesheet(): ViewStylesheet {
    return this._stylesheet
  }

  public setStylesheet(stylesheet: ViewStylesheet) {
    this._stylesheet = stylesheet
  }

  public handleMouseEnter() {
    this._isMouseIn = true

    this.switchStateByEvent('mouseenter')
  }

  public handleMouseLeave() {
    this._isMouseIn = false

    this.switchStateByEvent('mouseleave')
  }

  public handleMouseDown(ev: MouseEvent) {
    this.switchStateByEvent('mousedown')
    this.onMouseDown(ev)
  }

  public handleMouseUp(ev: MouseEvent) {
    this.switchStateByEvent('mouseup')
    this.onMouseUp(ev)
  }

  public isMouseIn(): boolean {
    return this._isMouseIn
  }

  public setViewHost(host: ViewHost) {
    this._viewHost = host
  }

  // ------------------------------------------------------- //
  // -----------------  Protected Methods  ----------------- //
  // ------------------------------------------------------- //
  protected onStateChanged(prevState: ViewState) {}
  protected onMouseDown(ev: MouseEvent) {}
  protected onMouseUp(ev: MouseEvent) {}

  protected setState(state: ViewState) {
    if (this._state === state) {
      return
    }

    const prev = this._state
    this._state = state

    this.onStateChanged(prev)
  }

  protected getState() {
    return this._state
  }

  protected requestPaint() {
    this._viewHost.requestPaint()
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //

  private switchStateByEvent(eventType: keyof HTMLElementEventMap) {
    const targetState = this._viewStateMachine.switch(
      this.getState(),
      eventType
    )

    this.setState(targetState)
  }

  private getMatrix(): Matrix {
    const matrix = this._transform.toMatrix()

    if (!this._parent) {
      return matrix
    }

    return this._parent.getMatrix().append(matrix)
  }

  private paintBorder(painter: Painter, border: BorderStyle) {
    painter.save()
    const rect = this.getLocalRect()
    const outerRounedRect = new RoundedRect(
      {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      },
      border.radius
    )
    const outerPath = outerRounedRect.toPath2D()
    const innerRoundedRect = outerRounedRect.clone().shrink(border.width)
    innerRoundedRect.radius =
      border.radius - border.width >= 0 ? border.radius - border.width : 0
    const innerPath = innerRoundedRect.toPath2D()
    const clipPath = new Path2D()
    clipPath.addPath(outerPath)
    clipPath.addPath(innerPath)
    painter.clipPath = clipPath
    painter.brush.color = border.color
    painter.fillRoundedRect(this.getLocalRect(), border.radius, border.radius)

    painter.restore()
  }

  private paintBackground(painter: Painter, background: BackgroundStyle) {
    painter.save()
    painter.brush.color = background.color
    painter.fillRoundedRect(
      this.getLocalRect(),
      // TODO:
      // It's better to implement radius by clip, so we can
      // get rid of the dependency of border
      this.getStylesheet().border.radius,
      this.getStylesheet().border.radius
    )
    painter.restore()
  }

  private paintRuler(painter: Painter) {
    painter.save()

    painter.pen.color = Color.RED
    const p1 = Vector.create({
      x: this.getLocalRect().center.x,
      y: this.getLocalRect().top,
    })

    const p2 = p1.clone()
    p2.y = this.getLocalRect().bottom
    painter.strokeLine(
      Line.from({
        p1,
        p2,
      })
    )

    painter.restore()
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _children: View[] = []
  private _parent: Optional<View> = undefined
  private _transform: Transform = Transform.fromIdentity()
  private _size: Size = Size.create()
  private _state: ViewState = ViewState.Normal
  private _isMouseIn: boolean = false
  private _viewHost: ViewHost = EmptyViewHost.create()
  private _stylesheet: ViewStylesheet = ViewStylesheet.create()
  private _viewStateMachine: ViewStateMachine = new ViewStateMachine()
}
