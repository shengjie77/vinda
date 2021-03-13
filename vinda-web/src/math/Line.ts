import { Vector2 } from 'src/math';
import { ConstructorOf, Equalable } from 'src/types';

export class Line implements Equalable {

	public static create(p: LineParameter): Line {
		const line = new Line();

		if (isRawParam(p)) {
			line.x1 = p.x1;
			line.y1 = p.y1;
			line.x2 = p.x2;
			line.y2 = p.y2;
		} else {
			line.p1 = p.p1;
			line.p2 = p.p2;
		}

		return line;
	}

	public x1: number = 0;

	public y1: number = 0;

	public x2: number = 0;

	public y2: number = 0;

	public get p1(): Vector2 {
		return new Vector2(this.x1, this.y1);
	}

	public set p1(pt: Vector2) {
		this.x1 = pt.x;
		this.y1 = pt.y;
	}

	public get p2(): Vector2 {
		return new Vector2(this.x2, this.y2);
	}

	public set p2(pt: Vector2) {
		this.x2 = pt.x;
		this.y2 = pt.y;
	}

	public get length(): number {
		const deltaX = this.x2 - this.x1;
		const deltaY = this.y2 - this.y1;
		return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	}

	public equalTo(v: Line) {
		return this.p1.equalTo(v.p1)
			&& this.p2.equalTo(v.p2)
	}

}

export interface LineStatic {

	create(p: LineParameter): Line;

}

export type LineParameter = LineRawParam | LinePointParam;

interface LineRawParam {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

interface LinePointParam {
	p1: Vector2;
	p2: Vector2;
}

function isRawParam(p: LineParameter): p is LineRawParam {
	return (p as LineRawParam).x1 !== undefined;
}

export type LineConstructor = ConstructorOf<Line, LineStatic>;
