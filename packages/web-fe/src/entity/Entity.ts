
export class Entity {

	public readonly id: string = idGenerator.gen();

	public children: Entity[] = [];

}

const idGenerator = {
	count: 0,
	gen() {
		return `${this.count++}`;
	}
}
