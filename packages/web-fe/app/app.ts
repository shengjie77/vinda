import { Page } from 'src/core';
import { MouseEventSource, MouseEventType } from 'src/system/event';

main();

function main() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    fillScreen(canvas);

    canvas.onclick = ev => console.log(ev.clientX, ev.clientY);

    const page = new Page(canvas);
    page.addLine({
        x1: 50,
        y1: 50,
        x2: 100,
        y2: 100,
    })

    page.addRect({
        left: 200,
        top: 200,
        right: 300,
        bottom: 400,
    })

    const source = new MouseEventSource(canvas);
    source.on(MouseEventType.LeftClick, () => console.log('left click'))
}

function fillScreen(canvas: HTMLCanvasElement) {
	canvas.style.height = '100vh';
    const ratio = window.devicePixelRatio;
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
}
