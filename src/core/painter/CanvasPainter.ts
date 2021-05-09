import { Painter, Brush, Pen, PainterState, PainterContext } from 'src/core/painter';
import { Line, Rect, Path, Polygon, Transform, Ellipse } from 'src/common/geometry';
import { Stack } from 'src/common';

export class CanvasPainter implements Painter {

	public static create(ctx: PainterContext) {
		return new CanvasPainter(ctx)
	}

	constructor(ctx: PainterContext) {
		this.ctx = ctx;
	}

	public get pen(): Pen {
		return this.state.pen;
	}

	public set pen(v: Pen) {
		this.state.pen = v;
	}

	public get brush(): Brush {
		return this.state.brush;
	}

	public set brush(v: Brush) {
		this.state.brush = v;
	}

	public get transform(): Transform {
		return this.state.transform;
	}

	public set transform(v: Transform) {
		this.state.transform = v;
	}

	public strokeLine(line: Line) {
		this.strokePath(Path.fromLine(line));
	}

	public strokePath(path: Path) {
		this.applyState();

		this.ctx.stroke(path.toPath2D());
	}

	public strokeRect(rect: Rect) {
		this.applyState();

		this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
	}

	public strokeEllipse(ellipse: Ellipse) {
		// UNIMPLEMENTED: 
		return {} as any;
	}

	public strokeRoundedRect(rect: Rect, radius: number) {
		this.applyState()

		let path = roundedRectToPath2D(rect, radius)
		this.ctx.stroke(path)
	}

	public strokePolygon(polygon: Polygon) {
		// UNIMPLEMENTED: 
		return {} as any;
	}

	public fillPath(path: Path) {
		this.applyState();

		this.ctx.fill(path.toPath2D(), path.fillRule);
	}

	public fillRect(rect: Rect) {
		this.applyState();

		this.ctx.fillRect(
			rect.x,
			rect.y,
			rect.width,
			rect.height,
		)
	}

	public fillRoundedRect(rect: Rect, xRadius: number, yRadius: number) {
		// UNIMPLEMENTED: 
		return {} as any;
	}

	public fillPolygon(polygon: Polygon) {
		// UNIMPLEMENTED: 
		return {} as any;
	}

	/**
	 * Saves the current painter state(pushes the state onto a stack).
	 *
	 * @memberof CanvasPainter
	 */
	public save() {
		this.stateStack.push(this.state.clone());
	}

	/**
	 * Restores the current painter state(pops a saved state off the stack).
	 *
	 * @memberof CanvasPainter
	 */
	public restore() {
		if (this.stateStack.isEmpty()) {
			return;
		}

		this.state = this.stateStack.pop()!;
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //

	private ctx: PainterContext;

	private stateStack: Stack<PainterState> = new Stack();

	private state: PainterState = new PainterState();

	/**
	 * Apply current PainterState to CanvasRenderingContext.
	 *
	 * @private
	 * @memberof CanvasPainter
	 */
	private applyState() {
		this.ctx.lineWidth = this.pen.width;
		this.ctx.lineCap = this.pen.cap;
		this.ctx.lineJoin = this.pen.join;
		this.ctx.strokeStyle = this.pen.color.toCSSColor();

		this.ctx.setTransform(this.state.transform.toMatrix().toDOMMatrix());
	}

}

function roundedRectToPath2D(rect: Rect, radius: number): Path2D {
	let path = new Path2D()

	path.moveTo(rect.left, rect.top + radius)
	path.arcTo(rect.left, rect.top, rect.left + radius, rect.top, radius)
	path.lineTo(rect.right - radius, rect.top)
	path.arcTo(rect.right, rect.top, rect.right, rect.top + radius, radius)
	path.lineTo(rect.right, rect.bottom - radius)
	path.arcTo(rect.right, rect.bottom, rect.right - radius, rect.bottom, radius)
	path.lineTo(rect.left + radius, rect.bottom)
	path.arcTo(rect.left, rect.bottom, rect.left, rect.bottom - radius, radius)
	path.closePath()

	return path
}
