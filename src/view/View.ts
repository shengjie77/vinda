import { Painter } from 'src/core/painter'
import { Matrix, Rect, RoundedRect, Transform, Size, Vector } from 'src/common/geometry';
import { PaintEntity } from 'src/core/system/paint';
import { Optional } from 'src/common';

import { Background } from './Background';
import { Border } from './Border';

export class View implements PaintEntity {

	// ------------------------------------------------------- //
	// ------------------  Static Methods  ------------------- //
	// ------------------------------------------------------- //
	public static create(): View {
		return new View();
	}

	// ------------------------------------------------------- //
	// -------------------  Public Methods  ------------------ //
	// ------------------------------------------------------- //
	public set position(v: Vector) {
		this.#transform.translation = v;
	}

	public get position(): Vector {
		return this.#transform.translation;
	}

	public set x(v: number) {
		this.#transform.translation.x = v;
	}

	public get x(): number {
		return this.#transform.translation.x;
	}

	public set y(v: number) {
		this.#transform.translation.y = v;
	}

	public get y(): number {
		return this.#transform.translation.y;
	}

	public set size(v: Size) {
		this.#size = v;
	}

	public get size(): Size {
		return this.#size;
	}

	public set width(v: number) {
		this.size.width = v;
	}

	public get width(): number {
		return this.size.width;
	}

	public set height(v: number) {
		this.size.height = v;
	}

	public get height(): number {
		return this.size.height;
	}

	public set bounds(v: Rect) {
		this.position = v.topLeft.clone();
		this.width = v.width;
		this.height = v.height;
	}

	public get bounds(): Rect {
		return Rect.create({
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
		})
	}

	public addChild(child: View) {
		child.#parent = this;
		this.#children.push(child);
	}

	public paint(painter: Painter) {
		this.paintBackground(painter, this.background);
		this.paintBorder(painter, this.border);
	}

	public getChildPaintEntites() {
		return this.#children;
	}

	public getPaintRect() {
		const matrix = this.getMatrix();
		
		const topLeft = Vector.create().transform(matrix);
		const bottomRight = Vector.create({ x: this.width, y: this.height }).transform(matrix);
		return Rect.create({ topLeft, bottomRight });
	}

	public border: Border = Border.create();
	public background: Background = Background.create();

	public rect: Rect = new Rect();

	// ------------------------------------------------------- //
	// ------------------  Private Methods  ------------------ //
	// ------------------------------------------------------- //
	private getMatrix(): Matrix {
		const matrix = this.#transform.toMatrix();

		if (!this.#parent) {
			return matrix;
		}

		return this.#parent.getMatrix().append(matrix);
	}

	// ------------------------------------------------------- //
	// -----------------  Private Properties  ---------------- //
	// ------------------------------------------------------- //
	#children: View[] = [];
	#parent: Optional<View> = undefined;
	#transform: Transform = Transform.fromIdentity();
	#size: Size = Size.create();

	public onPaint(painter: Painter) {
		this.paintBackground(painter, this.background);
		this.paintBorder(painter, this.border);
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //

	private paintBorder(painter: Painter, border: Border) {
		painter.save();
		const outerRounedRect = new RoundedRect({
			x: this.rect.x,
			y: this.rect.y,
			width: this.rect.width,
			height: this.rect.height,
		}, this.border.radius)
		const outerPath = outerRounedRect.toPath2D();
		const innerRoundedRect = outerRounedRect.clone().shrink(this.border.width);
		innerRoundedRect.radius = this.border.radius - this.border.width >= 0
			? this.border.radius - this.border.width
			: 0
		const innerPath = innerRoundedRect.toPath2D();
		const clipPath = new Path2D();
		clipPath.addPath(outerPath);
		clipPath.addPath(innerPath);
		painter.clipPath = clipPath;
		painter.brush.color = border.color;
		painter.fillRoundedRect(this.getPaintRect(), border.radius, border.radius);

		painter.restore();
	}

	private paintBackground(painter: Painter, background: Background) {
		painter.save();
		painter.brush.color = background.color;
		painter.fillRoundedRect(this.getPaintRect(), this.border.radius, this.border.radius);
		painter.restore();
	}

}
