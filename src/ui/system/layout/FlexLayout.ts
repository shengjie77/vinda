import { View } from 'src/ui/view'

import { CrossAxisAlignment, Layout, MainAxisAlignment } from './Layout'

export abstract class FlexLayout extends Layout {
  public override build(parentView: View) {
    const ctx = parentView.getChildren().reduce(
      (ctx: Context, view: View) => {
        const preferredLength = this.getPreferredMainAxisLength(view)
        const preMargin = this.getPreMargin(view)
        const postMargin = this.getPostMargin(view)
        ctx.space += preferredLength + preMargin + postMargin
        ctx.totalRatio += this.getMainAxisFlex(view)
        return ctx
      },
      { space: 0, totalRatio: 0, currentPos: 0 }
    )

    ctx.space = this.getMainAxisLength(parentView) - ctx.space
    if (ctx.space < 0) {
      ctx.space = 0
    }

    const updateChildSize = (currentPos: number, view: View) => {
      const mainVal = this.calculateViewMainAxisLength(view, ctx)
      const crossVal = this.getPreferredCrossAxisLength(view)
      this.setMainAxisLength(view, mainVal)
      this.setCrossAxisLength(view, crossVal)

      const nextPos = currentPos + mainVal
      return nextPos
    }

    const startPos = 0
    const currentPos = parentView
      .getChildren()
      .reduce(updateChildSize, startPos)
    ctx.currentPos = currentPos

    parentView.getChildren().forEach((e) => this.alignCrossAxis(parentView, e))

    this.alignMainAxis(parentView, ctx)
  }

  protected abstract getPreferredMainAxisLength(view: View): number
  protected abstract getPreferredCrossAxisLength(view: View): number
  protected abstract getMainAxisLength(view: View): number
  protected abstract getCrossAxisLength(view: View): number
  protected abstract getPreMargin(view: View): number
  protected abstract getPostMargin(view: View): number
  protected abstract getMainAxisFlex(view: View): number
  protected abstract setMainAxisLength(view: View, val: number): void
  protected abstract setCrossAxisLength(view: View, val: number): void
  protected abstract setMainAxisPosition(view: View, val: number): void
  protected abstract setCrossAxisPosition(view: View, val: number): void

  private calculateViewMainAxisLength(view: View, ctx: Context): number {
    const mainFlex = this.getMainAxisFlex(view)
    const flexSpace =
      mainFlex === 0 || ctx.totalRatio === 0
        ? 0
        : (mainFlex * ctx.space) / ctx.totalRatio
    const result = this.getPreferredMainAxisLength(view) + flexSpace
    return result
  }

  private alignCrossAxis(parent: View, child: View) {
    const parentCrossLength = this.getCrossAxisLength(parent)
    const childCrossLength = this.getCrossAxisLength(child)

    switch (parent.getCrossAxisAlign()) {
      case CrossAxisAlignment.Start:
        this.setCrossAxisPosition(child, 0)
        break

      case CrossAxisAlignment.Center:
        this.setCrossAxisPosition(
          child,
          0 + (parentCrossLength - childCrossLength) * 0.5
        )
        break

      case CrossAxisAlignment.End:
        this.setCrossAxisPosition(child, parentCrossLength - childCrossLength)
        break

      case CrossAxisAlignment.Stretch:
        const val = this.getCrossAxisLength(parent)
        this.setCrossAxisLength(child, val)
        break

      default:
        break
    }
  }

  private alignMainAxis(hostView: View, ctx: Context) {
    let startPos = 0
    let space = 0
    switch (hostView.getMainAxisAlign()) {
      case MainAxisAlignment.Start:
        startPos = 0
        space = 0
        break

      case MainAxisAlignment.Center:
        startPos = ctx.space * 0.5
        space = 0
        break

      case MainAxisAlignment.End:
        startPos = ctx.space
        space = 0
        break

      case MainAxisAlignment.SpaceBetween:
        startPos = 0
        space = ctx.space / (hostView.getChildren().length - 1)
        break

      case MainAxisAlignment.SpaceEvenly:
        space = ctx.space / (hostView.getChildren().length + 1)
        startPos = space
        break

      default:
        break
    }

    const updateChild = (currentPos: number, view: View) => {
      const preMargin = this.getPreMargin(view)
      const postMargin = this.getPostMargin(view)
      const mainLength = this.getMainAxisLength(view)
      this.setMainAxisPosition(view, currentPos + preMargin)
      const nextPos = currentPos + mainLength + space + preMargin + postMargin
      return nextPos
    }
    const currentPos = hostView.getChildren().reduce(updateChild, startPos)
    ctx.currentPos = currentPos
  }
}

interface Context {
  space: number
  totalRatio: number
  currentPos: number
}
