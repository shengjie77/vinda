import { Painter } from 'src/painter';

export interface Drawable {

	draw(painter: Painter): void;

}
