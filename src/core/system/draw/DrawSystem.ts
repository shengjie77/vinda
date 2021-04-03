import * as _ from 'lodash';

import { assertNotNullable } from 'src/common';
import { Painter, CanvasPainter } from 'src/core/painter';
import { Drawable } from 'src/core/system';

export class DrawSystem {

	public static fromCanvas(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('2d');
		assertNotNullable(ctx);
		const painter = new CanvasPainter(ctx);

		return new DrawSystem({
			createPainter: () => painter,
		})
	}

	constructor(option: DrawSystemOption) {
		this.painter = option.createPainter();
	}

	public get items(): Drawable[] {
		return this._items;
	}

	public addItem(d: Drawable) {
		const exist = this._items.some(item => item === d);
		if (exist) {
			return;
		}

		this._items.push(d);
	}

	public removeItem(d: Drawable) {
		_.remove(this._items, item => item === d);
	}

	public draw() {
		this._items.forEach(item => item.draw(this.painter));
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //

	private _items: Drawable[] = [];

	private painter: Painter;

}

export interface DrawSystemOption {
	createPainter: () => Painter;
}
