import { Vector } from 'src/common/geometry'
import { View } from 'src/view'

import { CrossAxisAlignment, Layout, MainAxisAlignment } from './Layout'

export class RowLayout extends Layout {
  public static create(): RowLayout {
    return new RowLayout()
  }

  public setMainAxisAlignment(align: MainAxisAlignment) {
    this._mainAxisAlignment = align
  }

  public setCrossAxisAlignment(align: CrossAxisAlignment) {
    this._crossAxisAlignment = align
  }

  public override build(host: View) {
    const ctx = host.getLayoutEntities().reduce(
      (ctx: Context, e: View) => {
        const { basis, ratio } = e.getFlex()
        ctx.space += basis
        ctx.totalRatio += ratio
        return ctx
      },
      { space: 0, totalRatio: 0, right: 0 }
    )

    const startX = 0
    const y = 0
    ctx.space = host.getSize().width - ctx.space
    if (ctx.space < 0) {
      ctx.space = 0
    }

    const updateChild = (currentX: number, e: View) => {
      const w = this.calculateEntityWidth(e, ctx)
      const size = e.getSize()
      size.width = w
      e.setSize(size)

      const nextX = currentX + w
      return nextX
    }
    const right = host.getLayoutEntities().reduce(updateChild, startX)
    ctx.right = right

    host.getLayoutEntities().forEach((e) => this.alignCrossAxis(host, e))

    this.alignMainAxis(host, ctx)
  }

  private calculateEntityWidth(e: View, ctx: Context): number {
    const { basis, ratio } = e.getFlex()
    const flexSpace =
      ratio === 0 || ctx.totalRatio === 0
        ? 0
        : (ratio * ctx.space) / ctx.totalRatio
    const result = basis + flexSpace
    return result
  }

  private alignMainAxis(host: View, ctx: Context) {
    let startX = 0
    let space = 0
    switch (this._mainAxisAlignment) {
      case MainAxisAlignment.Start:
        startX = 0
        space = 0
        break

      case MainAxisAlignment.Center:
        startX = ctx.space * 0.5
        space = 0
        break

      case MainAxisAlignment.End:
        startX = ctx.space
        space = 0
        break

      case MainAxisAlignment.SpaceBetween:
        startX = 0
        space = ctx.space / (host.getLayoutEntities().length - 1)
        break

      case MainAxisAlignment.SpaceEvenly:
        space = ctx.space / (host.getLayoutEntities().length + 1)
        startX = space
        break

      default:
        break
    }

    const updateChild = (currentX: number, e: View) => {
      const pos = Vector.create({
        x: currentX,
        y: e.getPosition().y,
      })
      e.setPosition(pos)

      const size = e.getSize()

      const nextX = currentX + size.width + space
      return nextX
    }
    const right = host.getLayoutEntities().reduce(updateChild, startX)
    ctx.right = right
  }

  private alignCrossAxis(host: View, child: View) {
    const pos = child.getPosition()
    const hostSize = host.getSize()
    const childSize = child.getSize()

    switch (this._crossAxisAlignment) {
      case CrossAxisAlignment.Start:
        pos.y = 0
        break

      case CrossAxisAlignment.Center:
        pos.y = 0 + (hostSize.height - childSize.height) * 0.5
        break

      case CrossAxisAlignment.End:
        pos.y = hostSize.height - childSize.height
        break

      case CrossAxisAlignment.Stretch:
        childSize.height = hostSize.height
        break

      default:
        break
    }

    child.setPosition(pos)
    child.setSize(childSize)
  }

  private _mainAxisAlignment = MainAxisAlignment.Start
  private _crossAxisAlignment = CrossAxisAlignment.Start
}

interface Context {
  space: number
  totalRatio: number
  right: number
}
