import { EntityId } from 'src/core/entity';

export class EntityIdGenerator {

	public static create() {
		return new EntityIdGenerator();
	}

	public gen(): EntityId {
		this._entityCount++;

		return this._entityCount;
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //
	private _entityCount = 0;

}
