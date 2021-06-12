import { isEqual, Cloneable, Equalable } from 'src/common';

import { convertValueRange, IntegerRange, FloatRange } from './ValueRange';

export class Color implements Cloneable, Equalable {

	/**
	 * Create Color instance based on RGBA models.
	 * Each component's value ranges from 0 to 255.
	 */
	public static fromRgba(r: number, g: number, b: number, a: number): Color {
		return new Color(r, g, b, a);
	}

	/**
	 * Create Color instance based on RGBA models.
	 * Each component's value ranges from 0.0 to 1.0
	 */
	public static fromRgbaF(r: number, g: number, b: number, a: number): Color {
		const [red, green, blue, alpha] = [r, g, b, a].map(v => convertValueRange(v, FloatRange, IntegerRange));
		return new Color(red, green, blue, alpha);
	}

	public static fromCSS(css: string): Color {
		const regx = /#[0-9a-zA-Z]{6}/;
		if (regx.test(css)) {
			return Color.fromRgba(
				parseInt(`0x${css.slice(1,3)}`),
				parseInt(`0x${css.slice(3,5)}`),
				parseInt(`0x${css.slice(5,7)}`),
				255,
			)
		}
		
		console.error(`${css} is not valid.`);

		return Color.BLACK;
	}

	public static get WHITE(): Color {
		return new Color(255, 255, 255, 255);
	}

	public static get BLACK(): Color {
		return new Color(0, 0, 0, 255);
	}

	public static get RED(): Color {
		return new Color(255, 0, 0, 255);
	}

	public static get GREEN(): Color {
		return new Color(0, 255, 0, 255);
	}

	public static get BLUE(): Color {
		return new Color(0, 0, 255, 255);
	}

	public static get TRANSPARENT(): Color {
		return new Color(0, 0, 0, 0);
	}

	public red: number = 0;

	public green: number = 0;

	public blue: number = 0;

	public alpha: number = 0;

	constructor(r: number, g: number, b: number, a: number) {
		this.red = r;
		this.green = g;
		this.blue = b;
		this.alpha = a;
	}

	public clone() {
		const color = new Color(
			this.red,
			this.green,
			this.blue,
			this.alpha,
		)

		return color;
	}

	/**
	 * Convert Color to css color string
	 *
	 * @returns
	 * @memberof Color
	 */
	public toCSSColor(): string {
		const alpha = convertValueRange(this.alpha, IntegerRange, FloatRange);
		return `rgba(${this.red}, ${this.green}, ${this.blue}, ${alpha})`;
	}

	public equalTo(color: Color) {
		return isEqual(this.red, color.red)
			&& isEqual(this.green, color.green)
			&& isEqual(this.blue, color.blue)
			&& isEqual(this.alpha, color.alpha)
	}

}
