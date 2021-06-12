import { Color } from 'src/common/color';

export class Background {
	public static create(): Background {
		return new Background();
	}

	public color: Color = Color.TRANSPARENT;
}
