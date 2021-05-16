import { Color } from 'src/common/color';
import { Rect } from 'src/common/geometry';
import { Painter } from 'src/core/painter';
import { View } from 'src/view';

export class Button extends View {

	constructor() {
		super();

		this.border.color = Color.BLACK;
		this.border.radius = 16;
		this.border.width = 10;
		this.background.color = Color.RED;
		this.rect = Rect.create({x: 10, y: 10, width: 200, height: 100})
	}

	public onPaint(painter: Painter) {
		super.onPaint(painter);
	}

}
