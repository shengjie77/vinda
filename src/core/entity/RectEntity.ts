import { Entity } from 'src/core/entity'
import { Control } from 'src/core/feature/Control'
import { RenderComponent } from 'src/core/system'

export class RectEntity
  extends Entity
  implements RenderComponent
{
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

    ctx.fillStyle = 'green'
    const path2 = new Path2D()
    path2.rect(0, 0, this.width / 2, this.height / 2)
    ctx.fill(path2)

    if (this.hover) {
      ctx.strokeStyle = 'green'
      ctx.lineWidth = 2
      ctx.stroke(path)
    }

    if (this.selected) {
      ctx.strokeStyle = 'blue'
      ctx.lineWidth = 4
      ctx.stroke(path)

      this.controls.forEach((control) => {
        ctx.fillStyle = 'black'
        const rect = control.rect
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
      })
    }

    ctx.restore()
  }

  getRenderMatrix(): DOMMatrix {
    return this.matrixWithoutScale.toDOMMatrix()
  }

  public get controls(): Control[] {
    return [
      Control.TopLeftResize(this),
      Control.TopRightResize(this),
      Control.BottomLeftResize(this),
      Control.BottomRightResize(this),
      Control.Rotate(this),
    ]
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
}
