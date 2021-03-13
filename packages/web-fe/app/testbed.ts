import * as he from 'src';

(window as any).he = he;

const canvas = document.getElementById('canvas') as HTMLCanvasElement
fillScreen(canvas);

function fillScreen(canvas: HTMLCanvasElement) {
	canvas.style.height = '100vh';
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight
}
