import { View } from 'src/ui/view'

import { FlexLayout } from './FlexLayout'

export class ColumnLayout extends FlexLayout {
  public static create(): ColumnLayout {
    return new ColumnLayout()
  }

  protected override getPreferredMainAxisLength(view: View): number {
    return view.getPreferredSize().height
  }

  protected override getPreferredCrossAxisLength(view: View): number {
    return view.getPreferredSize().width
  }

  protected override getMainAxisLength(view: View): number {
    return view.getSize().height
  }

  protected override getCrossAxisLength(view: View): number {
    return view.getSize().width
  }

  protected override getPreMargin(view: View): number {
    return view.getStylesheet().layout.margin.top
  }

  protected override getPostMargin(view: View): number {
    return view.getStylesheet().layout.margin.bottom
  }

  protected override getMainAxisFlex(view: View): number {
    return view.getStylesheet().layout.heightFlex
  }

  protected override setMainAxisLength(view: View, val: number) {
    view.setHeight(val)
  }

  protected override setCrossAxisLength(view: View, val: number) {
    view.setWidth(val)
  }

  protected override setMainAxisPosition(view: View, val: number) {
    view.setY(val)
  }

  protected override setCrossAxisPosition(view: View, val: number) {
    view.setX(val)
  }
}
