import { Color } from 'src/common/color'
import { Rect } from 'src/common/geometry'
import { Painter } from 'src/ui/painter'
import { View } from 'src/ui/view'

export class Button extends View {
  public text: string = 'button'

  constructor() {
    super()

    // this.border.color = Color.fromCSS('#0078d4');
    this.border.color = Color.RED
    this.border.radius = 16
    this.border.width = 1
    this.background.color = Color.fromCSS('#0078d4')
    // this.rect = Rect.create({ x: 10, y: 10, width: 200, height: 100 })
  }

  public onPaint(painter: Painter) {
    super.onPaint(painter)

    this.paintText(painter, this.text)
  }

  protected paintText(painter: Painter, text: string) {
    painter.save()
    // painter.drawText(this.text, this.rect)
    painter.restore()
  }
}
