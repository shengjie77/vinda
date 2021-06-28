import { Rect } from 'src/common/geometry'

export interface EventEntity {
  getHitTestRect(): Rect
  mouseDown(): void
}
