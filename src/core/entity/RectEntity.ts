import { Entity } from 'src/core/entity'
import { RenderComponent } from 'src/core/system'

export class RectEntity extends Entity implements RenderComponent {
  public toPath(): Path2D {
    const path = new Path2D()
    path.rect(0, 0, 1, 1)

    return path
  }

  // Implement RenderComponent
  render(ctx: CanvasRenderingContext2D): void {
    ctx.save()

    const p = new Path2D()
    p.addPath(this.toPath(), this.matrix.toDOMMatrix())
    ctx.fill(p)
    if (this.hover) {
      ctx.strokeStyle = 'green'
      ctx.lineWidth = 2
      ctx.stroke(p)
    }

    ctx.restore()
  }
}
