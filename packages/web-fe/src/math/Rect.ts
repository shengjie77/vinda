import { Vector2 } from 'src/math';
import { ConstructorOf } from 'src/types';

export class Rect {

	public static create(p: RectParameter): Rect {
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

	public get topLeft(): Vector2 {
		return new Vector2(this.top, this.left);
	}

	public set topLeft(pt: Vector2) {
		this.left = pt.x;
		this.top = pt.y;
	}

	public get topRight(): Vector2 {
		return new Vector2(this.top, this.right);
	}

	public set topRight(pt: Vector2) {
		this.right = pt.x;
		this.top = pt.y;
	}

	public get bottomLeft(): Vector2 {
		return new Vector2(this.bottom, this.left);
	}

	public set bottomLeft(pt: Vector2) {
		this.left = pt.x;
		this.bottom = pt.y;
	}

	public get bottomRight(): Vector2 {
		return new Vector2(this.bottom, this.right);
	}

	public set bottomRight(pt: Vector2) {
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
	create(p: RectParameter): Rect;
}

export type RectConstructor = ConstructorOf<Rect, RectStatic>;

export type RectParameter = RectSizeParam | RectBorderParam | RectPointParam;

type RectSizeParam = { x: number, y: number, width: number, height: number };
type RectBorderParam = { top: number, bottom: number, left: number, right: number };
type RectPointParam = { topLeft: Vector2, bottomRight: Vector2 };

function isSizeParam(p: RectParameter): p is RectSizeParam {
	return (p as RectSizeParam).width !== undefined;
}

function isBorderParam(p: RectParameter): p is RectBorderParam {
	return (p as RectBorderParam).left !== undefined;
}
