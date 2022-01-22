import { World } from 'src/core/World'

export class RenderSystem {
  public render(ctx: CanvasRenderingContext2D, world: World) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.save()
    const r = window.devicePixelRatio
    ctx.scale(r, r)

    world.entities.forEach((e) => {
      ctx.save()

      ctx.setTransform(...e.matrix.toArray())
      ctx.fill(e.toPath())

      ctx.restore()
    })

    ctx.restore()
  }
}
