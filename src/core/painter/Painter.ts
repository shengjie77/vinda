import { Brush, Pen } from 'src/core/painter';
import { Line, Rect, Path, Polygon, Transform } from 'src/common/geometry';
import { Optional } from 'src/common/types';

export interface Painter {

	pen: Pen;

	brush: Brush;

	transform: Transform;

	clipPath: Optional<Path2D>;

	strokeLine(line: Line): void;

	strokePath(path: Path): void;

	strokeRect(rect: Rect): void;

	strokeRoundedRect(rect: Rect, radius: number): void;

	strokePolygon(polygon: Polygon): void;

	fillPath(path: Path): void;

	fillRect(rect: Rect): void;

	fillRoundedRect(rect: Rect, xRadius: number, yRadius: number): void;

	fillPolygon(polygon: Polygon): void;

	save(): void;

	restore(): void;

	test(): void;

}

