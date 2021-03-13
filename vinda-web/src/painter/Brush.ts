import { Color } from 'src/common/color';
import { Cloneable } from 'src/types';

export class Brush implements Cloneable {

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
