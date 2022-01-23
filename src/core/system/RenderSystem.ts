import { Matrix } from 'src/base/geometry'
import { World } from 'src/core/World'

export class RenderSystem {
  public render(ctx: CanvasRenderingContext2D, world: World) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.save()
    const r = window.devicePixelRatio
    const matrix = Matrix.fromScale(r, r).append(world.matrix)
    ctx.setTransform(...matrix.toArray())

    world.entities.forEach((e) => {
      ctx.save()

      const p = new Path2D()
      p.addPath(e.toPath(), e.matrix.toDOMMatrix())
      ctx.fill(p)
      if (e.hover) {
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 2
        ctx.stroke(p)
      }

      ctx.restore()
    })

    ctx.restore()
  }
}
