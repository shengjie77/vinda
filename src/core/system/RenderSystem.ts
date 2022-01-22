import { World } from 'src/core/World'

export class RenderSystem {
  public render(ctx: CanvasRenderingContext2D, world: World) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.save()
    const r = window.devicePixelRatio
    ctx.scale(r, r)
    ctx.translate(world.translation.x, world.translation.y)

    world.entities.forEach((e) => {
      ctx.save()

      ctx.translate(e.position.x, e.position.y)
      ctx.scale(e.scale.x, e.scale.y)
      ctx.rotate(e.rotation.radian)
      ctx.fill(e.toPath())

      ctx.restore()
    })

    ctx.restore()
  }
}
