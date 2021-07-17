import { LayoutValue } from 'src/ui/style'
import { View } from 'src/ui/view'

import { ColumnLayout } from './ColumnLayout'
import { Layout } from './Layout'
import { RowLayout } from './RowLayout'

export interface LayoutSystemProvider {
  getViews(): View[]
}

export class LayoutSystem {
  public static create(provider: LayoutSystemProvider) {
    return new LayoutSystem(provider)
  }

  constructor(provider: LayoutSystemProvider) {
    this._provider = provider
    this._layoutMap = new Map()
    this._layoutMap.set(LayoutValue.Column, new ColumnLayout())
    this._layoutMap.set(LayoutValue.Row, new RowLayout())
  }

  public build(): void {
    this._provider.getViews().forEach((v) => this.traverse(v))
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //

  private traverse(view: View) {
    const layout = this._layoutMap.get(view.getStylesheet().layout.type)
    layout!.build(view)

    view.getChildren().forEach((v) => this.traverse(v))
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _provider: LayoutSystemProvider
  private _layoutMap: Map<LayoutValue, Layout>
}
