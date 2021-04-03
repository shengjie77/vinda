import { Color, isEqual, Cloneable, Equalable } from 'src/common';

import { PenCap } from './PenCap';
import { PenJoin } from './PenJoin';

export class Pen implements Cloneable, Equalable {

	public color: Color = Color.BLACK;

	public width: number = 1.0;

	public cap: PenCap = PenCap.Butt;

	public join: PenJoin = PenJoin.Bevel;

	public clone(): Pen {
		const pen = new Pen();

		pen.color = this.color.clone();
		pen.width = this.width;

		return pen;
	}

	public equalTo(pen: Pen) {
		return this.color.equalTo(pen.color)
			&& isEqual(this.width, pen.width)
			&& this.cap === pen.cap
			&& this.join === pen.join
	}

}

