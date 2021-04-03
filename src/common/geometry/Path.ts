import { PathFillRule, Line, Vector } from 'src/common';

export class Path {

	public static fromLine(line: Line): Path {
		const p = new Path();

		p.moveTo(line.p1);
		p.lineTo(line.p2)

		return p;
	}

	public fillRule: PathFillRule = PathFillRule.NonZero;

	public moveTo(pt: Vector) {
		this.path2d.moveTo(pt.x, pt.y);
	}

	public lineTo(pt: Vector) {
		this.path2d.lineTo(pt.x, pt.y);
	}

	public close() {
		this.path2d.closePath();
	}

	public toPath2D(): Path2D {
		return this.path2d;
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //

	private path2d: Path2D = new Path2D();

}
