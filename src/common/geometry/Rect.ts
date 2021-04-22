import { Vector, ConstructorOf } from 'src/common';

export class Rect {

	public static from(p: RectLike): Rect {
		const rect = new Rect();

		if (isSizeParam(p)) {
			rect.x = p.x;
			rect.y = p.y;
			rect.width = p.width;
			rect.height = p.height;
		} else if (isBorderParam(p)) {
			rect.top = p.top;
			rect.bottom = p.bottom;
			rect.left = p.left;
			rect.right = p.right;
		} else {
			rect.topLeft = p.topLeft;
			rect.bottomRight = p.bottomRight;
		}

		return rect;
	}

	public top: number = 0;

	public bottom: number = 0;

	public left: number = 0;

	public right: number = 0;

	public get topLeft(): Vector {
		return new Vector(this.top, this.left);
	}

	public set topLeft(pt: Vector) {
		this.left = pt.x;
		this.top = pt.y;
	}

	public get topRight(): Vector {
		return new Vector(this.top, this.right);
	}

	public set topRight(pt: Vector) {
		this.right = pt.x;
		this.top = pt.y;
	}

	public get bottomLeft(): Vector {
		return new Vector(this.bottom, this.left);
	}

	public set bottomLeft(pt: Vector) {
		this.left = pt.x;
		this.bottom = pt.y;
	}

	public get bottomRight(): Vector {
		return new Vector(this.bottom, this.right);
	}

	public set bottomRight(pt: Vector) {
		this.right = pt.x;
		this.bottom = pt.y;
	}

	public get x(): number {
		return this.left;
	}

	public set x(v: number) {
		const delta = v - this.left;
		this.left = v;
		this.right += delta;
	}

	public get y(): number {
		return this.top;
	}

	public set y(v: number) {
		const delta = v - this.top;
		this.top = v;
		this.bottom += delta;
	}

	public get width(): number {
		return this.right - this.left;
	}

	public set width(v: number) {
		this.right = this.left + v;
	}

	public get height(): number {
		return this.bottom - this.top;
	}

	public set height(v: number) {
		this.bottom = this.top + v;
	}

}

interface RectStatic {
	from(p: RectLike): Rect;
}

export type RectConstructor = ConstructorOf<Rect, RectStatic>;

export type RectLike = RectSizeParam | RectBorderParam | RectPointParam;

type RectSizeParam = { x: number, y: number, width: number, height: number };
type RectBorderParam = { top: number, bottom: number, left: number, right: number };
type RectPointParam = { topLeft: Vector, bottomRight: Vector };

function isSizeParam(p: RectLike): p is RectSizeParam {
	return (p as RectSizeParam).width !== undefined;
}

function isBorderParam(p: RectLike): p is RectBorderParam {
	return (p as RectBorderParam).left !== undefined;
}
