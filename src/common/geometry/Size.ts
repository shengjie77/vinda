import { Equalable, Cloneable } from 'src/common';

const DEFAULT_PARAM: SizeParam = {
	width: 0,
	height: 0,
}

export class Size implements Equalable, Cloneable {

	public static create(param?: Partial<SizeParam>) {
		return new Size(param);
	}

	constructor(param: Partial<SizeParam> = DEFAULT_PARAM) {
		this.width = param.width ?? DEFAULT_PARAM.width;
		this.height = param.height ?? DEFAULT_PARAM.height;
	}

	set width(v: number) {
		this.#width = v;
	}

	get width(): number {
		return this.#width;
	}

	set height(v: number) {
		this.#height = v;
	}

	get height(): number {
		return this.#height;
	}

	public equalTo(other: Size) {
		return this.width === other.width
			&& this.height === other.height
	}

	public clone(): Size {
		const size = Size.create();

		size.width = this.width;
		size.height = this.height;

		return size;
	}

	// ------------------------------------------------------- //
	// -----------------  Private Properties  ---------------- //
	// ------------------------------------------------------- //
	#width: number = 0;
	#height: number = 0;

}

export interface SizeParam {
	width: number;
	height: number;
}