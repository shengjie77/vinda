import { LayoutEntity } from './LayoutEntity';

export class LayoutSystem {

	public static create() {
		return new LayoutSystem();
	}

	public addEntity(e: LayoutEntity) {
		this.#entities.push(e);
	}

	public build(): void {
		this.#entities.forEach(e => e.build());
	}

	// ------------------------------------------------------- //
	// -----------------  Private Properties  ---------------- //
	// ------------------------------------------------------- //
	#entities: LayoutEntity[] = [];

}
