import * as PIXI from 'pixi.js';
import {
	Rect,
	Line,
	CanvasPainter,
	Angle,
	Matrix,
	Transform,
} from 'src';
import { Color } from 'src/common';
import { PenCap } from 'src/painter/PenCap';
import { PenJoin } from 'src/painter/PenJoin';

main();

function main() {
	mountUI();
}

function mountUI() {

}

function fillScreen(canvas: HTMLCanvasElement) {
	canvas.style.height = '100vh';
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight
}

// const canvas = document.getElementById('canvas') as HTMLCanvasElement
// canvas.width = canvas.clientWidth;
// canvas.height = canvas.clientHeight;
// fillScreen(canvas);

// const ctx = canvas.getContext('2d')!;

// const painter = new CanvasPainter(ctx);

// draw line
const line = Line.create({
	x1: 100,
	y1: 100,
	x2: 200,
	y2: 200,
})

// painter.pen.color = Color.RED;
// painter.pen.width = 20;
// painter.pen.cap = PenCap.Square;
// painter.strokeLine(line);
// painter.pen.join = PenJoin.Miter;

// painter.transform.translate(100, 200);
// painter.transform.scale.x = 2;
// painter.transform.scale.y = 2;
// painter.transform.rotation = Angle.fromRadian(Math.PI / 3);
// painter.fillRect(Rect.create({
// 	x: 0,
// 	y: 0,
// 	width: 100,
// 	height: 100,
// }))

// draw rect
const rect = Rect.create({
	x: 20,
	y: 30,
	width: 100,
	height: 100,
})
// painter.fillRect(rect);

const t = Transform.fromIdentity();

// const pixiCanvas = document.getElementById('pixi') as HTMLCanvasElement;
// const app = new PIXI.Application({
// 	view: pixiCanvas,
// 	width: pixiCanvas.clientWidth,
// 	height: pixiCanvas.clientHeight,
// 	backgroundColor: 0xdddddd,
// });

// const rectGraphic = new PIXI.Graphics();
// rectGraphic.beginFill();
// rectGraphic.drawRect(0, 0, 100, 100)
// app.stage.position.x = 100;
// app.stage.position.y = 200;
// app.stage.scale.x = 2;
// app.stage.scale.y = 2;
// app.stage.rotation = Math.PI / 3;
// app.stage.addChild(rectGraphic);

// import { LineEntity } from 'src';
// const entity = new LineEntity({
// 	line: Line.create({
// 		x1: 10,
// 		y1: 10,
// 		x2: 200,
// 		y2: 100,
// 	}),
// })

// entity.draw(painter);
