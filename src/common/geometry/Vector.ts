import { isEqual, Matrix, Angle } from 'src/common';

export class Vector {

	public static from(pt: VectorLike) {
		return new Vector(pt.x, pt.y);
	}

	public x: number;

	public y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	public get angle(): Angle {
		const length = Math.sqrt(this.x * this.x + this.y * this.y);
		const radian = Math.acos(this.x / length);
		return Angle.fromRadian(Math.sin(this.y / length) > 0 ? radian : radian * -1);
	}

	public transform(m: Matrix): Vector {
		const x = this.x * m.a + this.y * m.c + m.tx;
		const y = this.x * m.b + this.y * m.d + m.ty;

		this.x = x;
		this.y = y;

		return this;
	}

	public clone(): Vector {
		return new Vector(this.x, this.y);
	}

	public equalTo(v: Vector): boolean {
		return isEqual(this.x, v.x)
			&& isEqual(this.y, v.y)
	}

}

interface VectorLike {
	x: number;
	y: number;
}
