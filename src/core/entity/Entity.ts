import { EntityId, EntityIdGenerator } from 'src/core/entity';

/**
 * Everything in Vinda's world is called Entity
 *
 * @export
 * @class Entity
 */
export class Entity {

	public readonly id: EntityId;

	constructor() {
		this.id = Entity.idGenerator.gen();
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //
	private static idGenerator = new EntityIdGenerator();

}
