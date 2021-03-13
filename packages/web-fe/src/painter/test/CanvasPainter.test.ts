import { Pen, CanvasPainter, Brush, PainterState } from 'src/painter';
import * as he from 'src/index';
import { screenshotOf } from 'src/test/screenshotOf';

describe('CanvasPainter', () => {

	describe('pen', () => {

		test('Initial pen should be a new pen', () => {
			const painter = createPainter();
			const expectPen = new Pen();

			expect(painter.pen.equalTo(expectPen)).toBeTruthy();
		})

	})

	describe('brush', () => {

		test('Initial bursh should be a new brush', () => {
			const painter = createPainter();
			const expectBrush = new Brush();

			expect(painter.brush.equalTo(expectBrush)).toBeTruthy();
		})

	})

	describe('save & restore', () => {

		test('Painter state should be restored to last saved', () => {
			const painter = createPainter();
			const originState = getCurrentState(painter);
			painter.save();

			modifyState(painter);
			let currentState = getCurrentState(painter);
			expect(originState.equalTo(currentState)).toBeFalsy();

			painter.restore();
			currentState = getCurrentState(painter)
			expect(originState.equalTo(currentState)).toBeTruthy();
		})

		function getCurrentState(painter: CanvasPainter) {
			const state = new PainterState();
			state.pen = painter.pen.clone();
			state.brush = painter.brush.clone();

			return state;
		}

		function modifyState(painter: CanvasPainter) {
			painter.pen.width += 1;
		}

	})

	describe('strokeRect', () => {

		test('Stroke rect with default state', async () => {
			const image = await screenshotOf(() => {
				const { Rect, CanvasPainter } = he;

				const canvas = document.getElementById('canvas') as HTMLCanvasElement;
				const ctx = canvas.getContext('2d')!
				const painter = new CanvasPainter(ctx);

				const rect = Rect.create({
					x: 200,
					y: 200,
					width: 100,
					height: 100,
				})
				painter.strokeRect(rect);
			})

			expect(image).toMatchImageSnapshot();
		})

	})

	describe('fillRect', () => {

		test('Fill rect with default state', async () => {
			const image = await screenshotOf(() => {
				const { Rect, CanvasPainter } = he;

				const canvas = document.getElementById('canvas') as HTMLCanvasElement;
				const ctx = canvas.getContext('2d')!
				const painter = new CanvasPainter(ctx);

				const rect = Rect.create({
					x: 100,
					y: 100,
					width: 100,
					height: 100,
				})
				painter.fillRect(rect);
			})

			expect(image).toMatchImageSnapshot();
		})

	})

	describe('strokeLine', () => {

		test('Stroke line with default state', async () => {
			const image = await screenshotOf(() => {
				const { Line, CanvasPainter } = he;

				const canvas = document.getElementById('canvas') as HTMLCanvasElement;
				const ctx = canvas.getContext('2d')!
				const painter = new CanvasPainter(ctx);

				const line = Line.create({
					x1: 100,
					y1: 100,
					x2: 200,
					y2: 200,
				})

				painter.strokeLine(line);
			})

			expect(image).toMatchImageSnapshot();
		})

	})

	describe('strokePath', () => {

		test('Path consists of a line', async () => {
			const image = await screenshotOf(() => {
				const { Path, CanvasPainter } = he;
				const canvas = document.getElementById('canvas') as HTMLCanvasElement;
				const ctx = canvas.getContext('2d')!
				const painter = new CanvasPainter(ctx);

				const path = new Path();
				path.moveTo({
					x: 0,
					y: 0,
				});

				path.lineTo({
					x: 100,
					y: 100,
				})
				painter.strokePath(path);
			})

			expect(image).toMatchImageSnapshot();
		})

	})

	describe('fillPath', () => {

		test('Path consists of a rect', async () => {
			const image = await screenshotOf(() => {
				const { Path, CanvasPainter } = he;
				const canvas = document.getElementById('canvas') as HTMLCanvasElement;
				const ctx = canvas.getContext('2d')!
				const painter = new CanvasPainter(ctx);

				const path = new Path();
				path.moveTo({
					x: 0,
					y: 0,
				});

				path.lineTo({
					x: 100,
					y: 0,
				})
				path.lineTo({
					x: 100,
					y: 100,
				})

				path.lineTo({
					x: 0,
					y: 100,
				})

				path.close();
				painter.fillPath(path);
			})

			expect(image).toMatchImageSnapshot();
		})

	})

})

function createPainter() {
	const ctx = {} as CanvasRenderingContext2D;
	const painter = new CanvasPainter(ctx);

	return painter;
}
