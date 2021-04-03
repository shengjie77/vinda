
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

	}

}

function fillScreen(canvas: HTMLCanvasElement) {
	canvas.style.height = '100vh';
	const ratio = window.devicePixelRatio;
	canvas.width = canvas.clientWidth * ratio;
	canvas.height = canvas.clientHeight * ratio;
}
