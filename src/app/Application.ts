import { CanvasPainter } from 'src/core';
import { Button, View } from 'src/view'
import { PaintSystem } from 'src/core/system/paint';
import { Color } from 'src/common';
import { Rect } from 'src/common/geometry';

export class Application {

	public static create(): Application {
		return new Application();
	}

	public run() {
		console.log('Application is running...');
		this.test();
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //

	private test() {
		const container = document.getElementById('container') as HTMLElement;
		// mountUI(container);
		const canvas = document.getElementById('canvas') as HTMLCanvasElement
		fillScreen(canvas);

		this.drawSomething()
	}

	private drawSomething() {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement
		// const painter = CanvasPainter.create(canvas.getContext('2d')!);
		
		// const btn = new Button()
		// btn.onPaint(painter)

		// painter.test();

		const paintSystem = PaintSystem.createFromCanvas(canvas);
		const view = View.create();
		view.background.color = Color.RED;
		view.bounds = Rect.create({ x: 20, y: 20, width: 512, height: 256 });
		console.log(view.getPaintRect());

		const childView = View.create();
		childView.background.color = Color.GREEN;
		childView.bounds = Rect.create({ x: 0, y: 0, width: 50, height: 50 });

		view.addChild(childView);
		console.log(childView.getPaintRect());

		paintSystem.addEntity(view);
		paintSystem.paint();
	}

}

function fillScreen(canvas: HTMLCanvasElement) {
	canvas.style.height = '100vh';
	const ratio = window.devicePixelRatio;
	canvas.width = canvas.clientWidth * ratio;
	canvas.height = canvas.clientHeight * ratio;
}
