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

    ctx.fillStyle = 'red'
    const path = new Path2D()
    path.rect(0, 0, this.width, this.height)
    ctx.fill(path)

    if (this.hover) {
      ctx.strokeStyle = 'green'
      ctx.lineWidth = 2
      ctx.stroke(path)
    }

    if (this.selected) {
      ctx.strokeStyle = 'blue'
      ctx.lineWidth = 4
      ctx.stroke(path)
    }

    ctx.restore()
  }

  getRenderMatrix(): DOMMatrix {
    const scale = this.scale.clone()
    scale.x = scale.x >= 0 ? 1 : -1
    scale.y = scale.y >= 0 ? 1 : -1

    return this.position
      .toMatrix()
      .append(scale.toMatrix())
      .append(this.rotation.toMatrix())
      .toDOMMatrix()
  }
}
