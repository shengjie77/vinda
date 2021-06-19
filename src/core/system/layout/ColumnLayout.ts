import { Vector } from 'src/common/geometry'

import { Layout } from './Layout'
import { LayoutEntity } from './LayoutEntity'

export class ColumnLayout extends Layout {
  public static create(): ColumnLayout {
    return new ColumnLayout()
  }

  public override build(host: LayoutEntity) {
    const startY = 0
    const x = 0

    const updatePosition = (currentY: number, e: LayoutEntity) => {
      const pos = Vector.create({
        x,
        y: currentY,
      })
      e.setPosition(pos)

      const nextY = currentY + e.getSize().height
      return nextY
    }

    host.getLayoutEntities().reduce(updatePosition, startY)
  }
}
