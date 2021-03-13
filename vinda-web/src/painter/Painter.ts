import { Brush, Pen } from 'src/painter';
import { Line, Rect, Path, Polygon, Transform } from 'src/math';

export interface Painter {

	pen: Pen;

	brush: Brush;

	transform: Transform;

	strokeLine(line: Line): void;

	strokePath(path: Path): void;

	strokeRect(rect: Rect): void;

	strokeRoundedRect(rect: Rect, xRadius: number, yRadius: number): void;

	strokePolygon(polygon: Polygon): void;

	fillPath(path: Path): void;

	fillRect(rect: Rect): void;

	fillRoundedRect(rect: Rect, xRadius: number, yRadius: number): void;

	fillPolygon(polygon: Polygon): void;

	save(): void;

	restore(): void;

}
