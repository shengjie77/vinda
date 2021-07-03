import { Vector } from 'src/common/geometry'
import { View } from 'src/ui/view'

import { Layout } from './Layout'

export class ColumnLayout extends Layout {
  public static create(): ColumnLayout {
    return new ColumnLayout()
  }

  public override build(host: View) {
    const startY = 0
    const x = 0

    const updatePosition = (currentY: number, e: View) => {
      const pos = Vector.create({
        x,
        y: currentY,
      })
      e.setPosition(pos)

      const nextY = currentY + this.calculateEntityHeight(e)
      return nextY
    }

    host.getLayoutEntities().reduce(updatePosition, startY)
  }

  private calculateEntityHeight(e: View): number {
    const height = e.getSize().height
    return height
  }
}
