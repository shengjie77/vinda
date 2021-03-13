import { Entity } from 'src/entity';
import { Line, LineParameter } from 'src/math';
import { Painter } from 'src/painter';
import { Drawable } from 'src/system';

export class LineEntity extends Entity implements Drawable {

	constructor(param: LineEntityParameter) {
		super();

		this.line = Line.create(param.line);
	}

	public draw(p: Painter) {
		p.save();

		p.strokeLine(this.line);

		p.restore();
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //

	private line: Line;

}

export interface LineEntityParameter {

	line: LineParameter | Line;

}
