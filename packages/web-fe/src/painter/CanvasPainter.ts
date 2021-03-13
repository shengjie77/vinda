import { Painter, Brush, Pen, PainterState, PainterContext } from 'src/painter';
import { Line, Rect, Path, Polygon, Transform } from 'src/math';
import { Stack } from 'src/common';

export class CanvasPainter implements Painter {

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

	public strokeRoundedRect(rect: Rect, xRadius: number, yRadius: number) {
		// UNIMPLEMENTED: 
		return {} as any;
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
