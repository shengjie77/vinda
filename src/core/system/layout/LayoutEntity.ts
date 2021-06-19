import { Rect, Size, Vector } from 'src/common/geometry'

import { Layout } from './Layout'
import { SizePolicy } from './SizePolicy'

export interface LayoutEntity {
  setSize(size: Size): void
  getSize(): Size

  setPosition(pos: Vector): void
  getPosition(): Vector

  layout(): void

  setLayout(layout: Layout): void
  getLayout(): Layout

  getLayoutEntities(): LayoutEntity[]
}

export interface SizePolicyPair {
  horizontal: SizePolicy
  vertical: SizePolicy
}
