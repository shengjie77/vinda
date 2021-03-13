// import { greet } from 'vinda-core';
import { greet } from 'vinda-core/vinda_core_bg.wasm';

main();

function main() {
	createContainer();

	addTestBtns([
		{
			text: 'Line',
			onClick: () => {
				console.log('line');
				greet();
			},
		},
		{
			text: 'Rect',
			onClick: () => {
				console.log('rect');
			},
		},
	])
}

function createContainer() {
	removeBodyMargin();

	const container = document.createElement('div');
	container.id = 'rootContainer';
	container.style.height = '100vh';
	document.body.appendChild(container);

	createCanvas(container);
}

function removeBodyMargin() {
	document.body.style.margin = '0';
}

function createCanvas(parent: HTMLElement) {
	const canvas = document.createElement('canvas');
	parent.appendChild(canvas);

	fillScreen(canvas);
}

function fillScreen(canvas: HTMLCanvasElement) {
	resizeCanvas();

	window.onresize = () => resizeCanvas();

	function resizeCanvas() {
		const width = canvas.parentElement!.clientWidth;
		const height = canvas.parentElement!.clientHeight;

		const ratio = window.devicePixelRatio;
		canvas.style.width = `${width}px`;
		canvas.style.height = `${height}px`;

		canvas.width = width * ratio;
		canvas.height = height * ratio;
	}
}

interface TestButton {
	text: string;
	onClick: () => void;
}

function addTestBtns(btns: TestButton[]) {
	let x = 20;
	const y = 20;
	const btnWidth = 100;
	const btnHeight = 40;
	const spacing = 20;
	btns.forEach((btn) => {
		const el = document.createElement('button');
		el.style.position = 'absolute';
		el.style.left = `${x}px`;
		el.style.top = `${y}px`;
		el.style.width = `${btnWidth}px`;
		el.style.height = `${btnHeight}px`;
		x += (spacing + btnWidth);
		el.textContent = btn.text;
		el.onclick = btn.onClick;

		document.body.appendChild(el);
	})
}
