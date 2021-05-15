import { Drawable, Painter } from 'src/core';
import { Rect } from 'src/common/geometry';

import { Entity } from './Entity';

export class RectEntity extends Entity implements Drawable {

	constructor() {
		super();

		this.rect_ = Rect.from({
			x: 0,
			y: 0,
			width: 100,
			height: 50,
		})
	}

	public draw(painter: Painter) {
		painter.strokeRect(this.rect_);
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //

	private rect_: Rect;

}
