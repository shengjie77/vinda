import { ConstructorOf, Cloneable } from 'src/common/types';
import { Vector } from './Vector';

export class Rect implements Cloneable {

	public static create(p?: RectLike): Rect {
		const rect = new Rect();
		if (p) {
			rect.update(p);
		}

		return rect;
	}

	public top: number = 0;

	public bottom: number = 0;

	public left: number = 0;

	public right: number = 0;

	public get topLeft(): Vector {
		return new Vector(this.left, this.top);
	}

	public set topLeft(pt: Vector) {
		this.left = pt.x;
		this.top = pt.y;
	}

	public get topRight(): Vector {
		return new Vector(this.right, this.top);
	}

	public set topRight(pt: Vector) {
		this.right = pt.x;
		this.top = pt.y;
	}

	public get bottomLeft(): Vector {
		return new Vector(this.left, this.bottom);
	}

	public set bottomLeft(pt: Vector) {
		this.left = pt.x;
		this.bottom = pt.y;
	}

	public get bottomRight(): Vector {
		return new Vector(this.right, this.bottom);
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

	public get center(): Vector {
		return new Vector(
			(this.left + this.right) / 2,
			(this.top + this.bottom) / 2,
		)
	}

	public update(p: RectLike) {
		if (isSizeParam(p)) {
			this.x = p.x;
			this.y = p.y;
			this.width = p.width;
			this.height = p.height;
		} else if (isBorderParam(p)) {
			this.top = p.top;
			this.bottom = p.bottom;
			this.left = p.left;
			this.right = p.right;
		} else {
			this.topLeft = p.topLeft;
			this.bottomRight = p.bottomRight;
		}
	}

	public shrink(val: number): this {
		this.x = this.x + val;
		this.y += val;
		this.width -= val * 2;
		this.height -= val * 2;

		return this;
	}

	// Cloneable
	public clone(): Rect {
		const rect = Rect.create({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
		})

		return rect;
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
