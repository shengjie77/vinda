import { View } from 'src/view'
import { PaintSystem } from 'src/core/system/paint';
import { LayoutSystem, SizePolicy } from 'src/core/system/layout';
import { Color } from 'src/common';
import { Rect, Size } from 'src/common/geometry';

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
		const paintSystem = PaintSystem.createFromCanvas(canvas);

		const layoutSystem = LayoutSystem.create();

		const view = View.create();
		view.background.color = Color.RED;
		// view.bounds = Rect.create({ x: 20, y: 20, width: 512, height: 256 });
		view.setSizePolicy({
			horizontal: SizePolicy.Fixed,
			vertical: SizePolicy.Fixed,
		})
		view.setLayoutSize(Size.create({ width: 512, height: 256 }));

		const cv1 = View.create();
		cv1.background.color = Color.GREEN;
		cv1.setSizePolicy({
			horizontal: SizePolicy.Fixed,
			vertical: SizePolicy.Fixed,
		})
		cv1.setLayoutSize(Size.create({ width: 50, height: 50 }));
		view.addChild(cv1);

		const cv2 = View.create();
		cv2.background.color = Color.BLUE;
		cv2.setSizePolicy({
			horizontal: SizePolicy.Fixed,
			vertical: SizePolicy.Fixed,
		})
		cv2.setLayoutSize(Size.create({ width: 80, height: 90 }));
		view.addChild(cv2);

		layoutSystem.addEntity(view);
		layoutSystem.build();

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
