import { assertNotNullable } from 'src/common';
import { GLContext, GLUniforms } from 'src/webgl';
import { Disposable } from 'src/types';

export class GLProgram implements Disposable {

	constructor(gl: GLContext, param: GLProgramParameter) {
		this._gl = gl;
		this._program = this.createProgram(param);
		this._uniforms = new GLUniforms(gl, this._program);
	}

	public setUniform(name: string, value: any) {
		this._uniforms.setValue(name, value);
	}

	public active() {
		this._gl.useProgram(this._program);
	}

	public dispose() {
		this._gl.deleteProgram(this._program);
	}

	private createProgram(param: GLProgramParameter) {
		const gl = this._gl;
		const program = gl.createProgram();

		assertNotNullable(program, 'Failed to create program.');

		const vertexShader = createShader(gl, gl.VERTEX_SHADER, param.vertexShader);
		gl.attachShader(program, vertexShader);

		const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, param.fragmentShader);
		gl.attachShader(program, fragmentShader);

		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			const log = gl.getProgramInfoLog(program);
			throw new Error(`Can not compile WebGL program. ${log}`);
		}

		return program;
	}

	private _gl: GLContext;

	private _program: WebGLProgram;

	private _uniforms: GLUniforms;

	public get program() {
		return this._program;
	}

}

export interface GLProgramParameter {
	vertexShader: string;
	fragmentShader: string;
}

function createShader(gl: GLContext, type: number, source: string): WebGLShader {
	const shader = gl.createShader(type);

	assertNotNullable(shader, 'Cannot create shader');

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.warn(gl.getShaderInfoLog(shader));
	}

	return shader;
}
