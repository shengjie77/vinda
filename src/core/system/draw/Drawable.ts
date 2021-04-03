import { Painter } from 'src/core/painter';

export interface Drawable {

	draw(painter: Painter): void;

}
