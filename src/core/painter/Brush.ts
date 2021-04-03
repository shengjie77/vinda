import { Cloneable, Color, Equalable } from 'src/common';

export class Brush implements Cloneable, Equalable {

	public color: Color = Color.WHITE;

	public clone(): Brush {
		const brush = new Brush();

		brush.color = this.color.clone();

		return brush;
	}

	public equalTo(brush: Brush) {
		return this.color.equalTo(brush.color);
	}

}
