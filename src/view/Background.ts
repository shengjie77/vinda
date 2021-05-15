import { Color } from 'src/common/color';
import { Optional } from 'src/common/types';

export class Background {
	public static create(): Background {
		return new Background();
	}

	public color: Optional<Color> = undefined;
}
