import { GLProgram } from 'src/webgl';
import { Pen, Brush } from 'src/painter';
import { Line, Rect, Polygon, Path, Matrix, Vector2 } from 'src/math';
import { assertNotNullable } from 'src/common';

import {
	POINT_FRAG,
	POINT_VERT,
	LINE_VS,
	LINE_FS,
} from './shader';
import { Painter } from './Painter';

// export class WebGLPainter implements Painter {
export class WebGLPainter {

	public pen: Pen = new Pen();

	public brush: Brush = new Brush();

	constructor(canvas: HTMLCanvasElement) {
		const ctx = canvas.getContext('webgl');
		assertNotNullable(ctx);

		this.gl = ctx;

		this.updateProjectMatrix();
	}

	public strokeLine(line: Line) {
		const gl = this.gl;

		// 1. create program
		const program = new GLProgram(gl, {
			vertexShader: LINE_VS,
			fragmentShader: LINE_FS,
		})

		program.active();

		// 2. create position buffer
		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

		const mt = Matrix.fromTranslate(line.x1, line.y1);
		const vector = new Vector2(line.x2 - line.x1, line.y2 - line.y1);
		const mr = Matrix.fromRotate(vector.angle);
		const width = this.pen.width;
		const length = line.length;
		const halfWidth = width / 2;
		const pts = [
			// start cap
			new Vector2(-halfWidth, -halfWidth),
			new Vector2(-halfWidth, halfWidth),
			// line
			new Vector2(0, -width / 2),
			new Vector2(0, width / 2),
			new Vector2(length, -width / 2),
			new Vector2(length, width / 2),
			// end cap
			new Vector2(length + halfWidth, -halfWidth),
			new Vector2(length + halfWidth, halfWidth),
		].map(v => {
			const pt = v.transform(mr).transform(mt);
			return [pt.x, pt.y];
		}).flat()
		const arr = new Float32Array(pts);
		gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);

		// 3. assign attribute
		const positionAttrib = gl.getAttribLocation(program.program, 'a_position');
		gl.enableVertexAttribArray(positionAttrib);
		gl.vertexAttribPointer(
			positionAttrib,
			2,
			gl.FLOAT,
			false,
			0,
			0,
		)

		// 4. init uniform
		const projectMatrixLocation = gl.getUniformLocation(program.program, 'u_projectMatrix');
		gl.uniformMatrix3fv(
			projectMatrixLocation,
			false,
			new Float32Array(this.projectMatrix.toArray()),
		)

		const lineCount = 1;
		const capLocation = gl.getUniformLocation(program.program, 'u_cap');
		const capCenterLocation = gl.getUniformLocation(program.program, 'u_capCenter');

		gl.uniform1i(capLocation, -1);
		gl.drawArrays(gl.TRIANGLE_STRIP, 2, (lineCount + 1) * 2);
		

		// draw cap
		const widthLocation = gl.getUniformLocation(program.program, 'u_width');
		gl.uniform1f(widthLocation, this.pen.width);

		gl.uniform1i(capLocation, 2);
		const startPos = line.p1;
		const endPos = line.p2;
		gl.uniform2f(capCenterLocation, startPos.x, startPos.y);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

		gl.uniform2f(capCenterLocation, endPos.x, endPos.y);
		gl.drawArrays(gl.TRIANGLE_STRIP, 2 + (lineCount + 1) * 2 - 2, 4);

	}

	public strokePath(path: Path) {

	}

	public strokeRect(rect: Rect) {

	}

	public strokeRoundedRect(rect: Rect, xRadius: number, yRadius: number) {

	}

	public strokePolygon(polygon: Polygon) {

	}

	public fillRect(rect: Rect) {

	}

	public fillRoundedRect(rect: Rect) {

	}

	public fillPolygon(polygon: Polygon) {

	}

	public save() {

	}

	public restore() {

	}

	public drawPoint() {
		// init program
		const gl = this.gl;
		const program = new GLProgram(this.gl, {
			vertexShader: POINT_VERT,
			fragmentShader: POINT_FRAG,
		})

		program.active();

		// init attribute

		const buffer = this.gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		const arr = new Float32Array([
			50, 50,
			800, 400,
		])
		gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);

		const posAttrib = gl.getAttribLocation(program.program, 'a_position');
		gl.enableVertexAttribArray(posAttrib);
		gl.vertexAttribPointer(
			posAttrib,
			2,
			gl.FLOAT,
			false,
			0,
			0,
		)

		// init uniform
		const projectMatrixLocation = gl.getUniformLocation(program.program, 'u_projectMatrix');
		gl.uniformMatrix3fv(
			projectMatrixLocation,
			false,
			new Float32Array(this.projectMatrix.toArray()),
		);

		// draw point
		this.gl.drawArrays(this.gl.LINES, 0, 2);
	}

	private updateProjectMatrix() {
		const { width, height } = this.gl.canvas;
		this.projectMatrix = Matrix.fromIdentity()
			.translate(-width * 0.5, -height * 0.5)
			.scale(2 / width, - 2 / height)
	}

	private gl: WebGLRenderingContext;

	private projectMatrix: Matrix = Matrix.fromIdentity();

}
