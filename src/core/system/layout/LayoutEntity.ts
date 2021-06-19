import { Rect, Size } from 'src/common/geometry'

import { Layout } from './Layout'
import { SizePolicy } from './SizePolicy'

export interface LayoutEntity {
  /**
   * Build the layout of child entities
   *
   * @memberof LayoutEntity
   */
  build(): void

  setLayout(layout: Layout): void
  getLayout(): Layout

  setSizePolicy(pair: SizePolicyPair): void
  getSizePolicy(): SizePolicyPair

  setLayoutSize(size: Size): void
  getLayoutSize(): Size

  getChildLayoutEntities(): LayoutEntity[]

  setActualBounds(rect: Rect): void
}

export interface SizePolicyPair {
  horizontal: SizePolicy
  vertical: SizePolicy
}
