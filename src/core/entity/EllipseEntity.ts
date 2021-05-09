import { Drawable, Painter } from 'src/core';
import { Ellipse } from 'src/common';

import { Entity } from './Entity';

export class EllipseEntity extends Entity implements Drawable {

	constructor() {
		super();

		this.ellipse_ = Ellipse.from({
			x: 0,
			y: 0,
			width: 100,
			height: 50,
		})
	}


	public draw(painter: Painter) {
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //

	private ellipse_: Ellipse;

}
