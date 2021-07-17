import { View } from 'src/ui/view'

import { FlexLayout } from './FlexLayout'

export class RowLayout extends FlexLayout {
  public static create(): RowLayout {
    return new RowLayout()
  }

  protected override getPreferredMainAxisLength(view: View): number {
    return view.getPreferredSize().width
  }

  protected override getPreferredCrossAxisLength(view: View): number {
    return view.getPreferredSize().height
  }

  protected override getMainAxisLength(view: View): number {
    return view.getSize().width
  }

  protected override getCrossAxisLength(view: View): number {
    return view.getSize().height
  }

  protected override getPreMargin(view: View): number {
    return view.getStylesheet().layout.margin.left
  }

  protected override getPostMargin(view: View): number {
    return view.getStylesheet().layout.margin.right
  }

  protected override getMainAxisFlex(view: View): number {
    return view.getStylesheet().layout.widthFlex
  }

  protected override setMainAxisLength(view: View, val: number) {
    view.setWidth(val)
  }

  protected override setCrossAxisLength(view: View, val: number) {
    view.setHeight(val)
  }

  protected override setMainAxisPosition(view: View, val: number) {
    view.setX(val)
  }

  protected override setCrossAxisPosition(view: View, val: number) {
    view.setY(val)
  }
}
