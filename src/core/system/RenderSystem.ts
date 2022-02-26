import { isUndefined } from 'lodash'

import { Matrix } from 'src/base/geometry'
import { World } from 'src/core/World'

export function hasRenderComponent(obj: any): obj is RenderComponent {
  return !isUndefined(obj.render)
}

export interface RenderComponent {
  render(ctx: CanvasRenderingContext2D): void
}

export class RenderSystem {
  public render(ctx: CanvasRenderingContext2D, world: World) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.save()
    const r = window.devicePixelRatio
    const matrix = Matrix.fromScale(r, r).append(world.matrix)
    ctx.setTransform(...matrix.toArray())

    world.renderComponents.forEach((c) => c.render(ctx))

    if (world.selectionEntity.visible) {
      ctx.save()

      const e = world.selectionEntity
      const p = new Path2D()
      p.addPath(e.toPath(), e.matrix.toDOMMatrix())
      ctx.strokeStyle = e.stroke!.color.toCSSColor()
      ctx.fillStyle = e.fill!.color.toCSSColor()
      ctx.fill(p)
      ctx.stroke(p)

      ctx.restore()
    }

    ctx.restore()
  }
}
