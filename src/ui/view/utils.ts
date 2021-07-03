import { Rect, Size } from 'src/common/geometry'
import { Brush, Painter } from 'src/ui/painter'
import { TextStyle } from 'src/ui/style'

export function paintText(
  painter: Painter,
  text: string,
  rect: Rect,
  style: TextStyle
) {
  painter.save()

  const textRect = rect.clone()

  const brush = new Brush()
  brush.color = style.color
  painter.brush = brush
  painter.font = style.font

  if (textRect.size.isEmpty()) {
    const size = measureText(painter, text, style)
    textRect.size = size
  }

  painter.drawText(text, textRect, {
    horizontalAlignment: style.horizontalAlignment,
    verticalAlignment: style.verticalAlignment,
  })

  painter.restore()
}

function measureText(painter: Painter, text: string, style: TextStyle): Size {
  painter.save()

  painter.font = style.font
  const size = painter.measureText(text)

  painter.restore()

  return size
}
