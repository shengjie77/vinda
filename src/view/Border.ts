import { Color } from 'src/common/color';

export class Border {

	public static create(): Border {
		return new Border();
	}

	public width: number = 0;

	public radius: number = 0;

	public color: Color = Color.TRANSPARENT;

}
