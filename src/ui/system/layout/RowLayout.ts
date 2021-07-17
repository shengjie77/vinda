import { Vector } from 'src/common/geometry'
import { View } from 'src/ui/view'

import { CrossAxisAlignment, Layout, MainAxisAlignment } from './Layout'

export class RowLayout extends Layout {
  public static create(): RowLayout {
    return new RowLayout()
  }

  public override build(parentView: View) {
    const ctx = parentView.getChildren().reduce(
      (ctx: Context, view: View) => {
        const { widthFlex, margin } = view.getStylesheet().layout
        const preferredSize = view.getPreferredSize()
        ctx.space += preferredSize.width + margin.left + margin.right
        ctx.totalRatio += widthFlex
        return ctx
      },
      { space: 0, totalRatio: 0, right: 0 }
    )

    const startX = 0
    ctx.space = parentView.getSize().width - ctx.space
    if (ctx.space < 0) {
      ctx.space = 0
    }

    const updateChild = (currentX: number, view: View) => {
      const w = this.calculateViewWidth(view, ctx)
      const preferredSize = view.getPreferredSize()
      const size = view.getSize()
      size.width = w
      size.height = preferredSize.height
      view.setSize(size)

      const nextX = currentX + w
      return nextX
    }
    const right = parentView.getChildren().reduce(updateChild, startX)
    ctx.right = right

    parentView.getChildren().forEach((e) => this.alignCrossAxis(parentView, e))

    this.alignMainAxis(parentView, ctx)
  }

  private calculateViewWidth(view: View, ctx: Context): number {
    const { widthFlex } = view.getStylesheet().layout
    const preferredSize = view.getPreferredSize()
    const flexSpace =
      widthFlex === 0 || ctx.totalRatio === 0
        ? 0
        : (widthFlex * ctx.space) / ctx.totalRatio
    const result = preferredSize.width + flexSpace
    return result
  }

  private alignMainAxis(hostView: View, ctx: Context) {
    let startX = 0
    let space = 0
    switch (hostView.getMainAxisAlign()) {
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
        space = ctx.space / (hostView.getChildren().length - 1)
        break

      case MainAxisAlignment.SpaceEvenly:
        space = ctx.space / (hostView.getChildren().length + 1)
        startX = space
        break

      default:
        break
    }

    const updateChild = (currentX: number, view: View) => {
      const margin = view.getStylesheet().layout.margin
      const pos = Vector.create({
        x: currentX + margin.left,
        y: view.getPosition().y,
      })
      view.setPosition(pos)

      const size = view.getSize()

      const nextX = currentX + size.width + space + margin.left + margin.right
      return nextX
    }
    const right = hostView.getChildren().reduce(updateChild, startX)
    ctx.right = right
  }

  private alignCrossAxis(host: View, child: View) {
    const pos = child.getPosition()
    const hostSize = host.getSize()
    const childSize = child.getSize()

    switch (host.getCrossAxisAlign()) {
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
}

interface Context {
  space: number
  totalRatio: number
  right: number
}
