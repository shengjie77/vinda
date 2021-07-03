import { Font } from 'src/common/font'
import {
  Line,
  Rect,
  Path,
  Polygon,
  Alignment,
  Matrix,
  Size,
} from 'src/common/geometry'
import { Optional } from 'src/common/types'
import { Brush, Pen } from 'src/ui/painter'

export interface TextOption {
  horizontalAlignment: Alignment
  verticalAlignment: Alignment
}

export interface Painter {
  pen: Pen

  brush: Brush

  matrix: Matrix

  clipPath: Optional<Path2D>

  font: Font

  strokeLine(line: Line): void

  strokePath(path: Path): void

  strokeRect(rect: Rect): void

  strokeRoundedRect(rect: Rect, radius: number): void

  strokePolygon(polygon: Polygon): void

  fillPath(path: Path): void

  fillRect(rect: Rect): void

  fillRoundedRect(rect: Rect, xRadius: number, yRadius: number): void

  fillPolygon(polygon: Polygon): void

  drawText(text: string, rect: Rect, opt?: Partial<TextOption>): void
  measureText(text: string): Size

  save(): void

  restore(): void

  test(): void
}
