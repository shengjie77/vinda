import { Color } from 'src/common/color';
import { Optional } from 'src/common/types';

export class Border {

	public static create(): Border {
		return new Border();
	}

	public width: number = 0;

	public radius: number = 0;

	public color: Optional<Color> = undefined;

}
