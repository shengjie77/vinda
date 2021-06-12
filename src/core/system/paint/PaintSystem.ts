import { Painter, CanvasPainter } from 'src/core/painter';

import { PaintEntity } from './PaintEntity';

export class PaintSystem {

	// ------------------------------------------------------- //
	// ------------------  Static Methods  ------------------- //
	// ------------------------------------------------------- //
	public static createFromCanvas(canvas: HTMLCanvasElement) {
		return new PaintSystem(canvas.getContext('2d')!);
	}

	// ------------------------------------------------------- //
	// -------------------  Public Methods  ------------------ //
	// ------------------------------------------------------- //
	constructor(ctx: CanvasRenderingContext2D) {
		this.#ctx = ctx;
		this.#painter = CanvasPainter.create(this.#ctx);
	}

	public paint() {
		this.#entites.forEach(e => this.paintRecursively(e));
	}

	public addEntity(entity: PaintEntity) {
		this.#entites.push(entity);
	}

	// ------------------------------------------------------- //
	// ------------------  Private Methods  ------------------ //
	// ------------------------------------------------------- //
	private paintRecursively(entity: PaintEntity) {
		entity.paint(this.#painter);
		entity.getChildPaintEntites().forEach(e => this.paintRecursively(e));
	}

	// ------------------------------------------------------- //
	// -----------------  Private Properties  ---------------- //
	// ------------------------------------------------------- //
	#ctx: CanvasRenderingContext2D;
	#painter: Painter;
	#entites: PaintEntity[] = [];

}
