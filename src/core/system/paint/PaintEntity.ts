import { Rect } from 'src/common/geometry';
import { Painter } from 'src/core/painter';

export interface PaintEntity {
	paint(painter: Painter): void;
	getChildPaintEntites(): PaintEntity[];
	getPaintRect(): Rect;
}
