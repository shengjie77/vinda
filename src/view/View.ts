import { Painter } from 'src/core/painter'

import { Background } from './Background';
import { Border } from './Border';

export class View {

	public border: Border = Border.create();
	public background: Background = Background.create();

	public onPaint(painter: Painter) {}

}
