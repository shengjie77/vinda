import { Cloneable, Equalable } from 'src/common/types';

export class Font implements Cloneable, Equalable {
	public size: number = 20;

	public toCSSString(): string {
		return `${this.size}px`;
	}

	public clone(): Font {
		const f = new Font();
		f.size = this.size;
		return f;
	}

	public equalTo(v: Font): boolean {
		return this.size === v.size;
	}

}
