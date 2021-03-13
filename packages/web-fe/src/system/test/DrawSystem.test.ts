import { DrawSystem, Drawable } from 'src/system';
import { Painter } from 'src/painter';

describe('DrawSystem', () => {

	describe('addItem', () => {

		test('Item should be added to system', () => {
			const { system } = createDrawSystem();
			const item = mockDrawable();
			system.addItem(item);
			const result = system.items.some(v => v === item);

			expect(result).toBeTruthy();
		})

		test('Adding a existing item should not work', () => {
			const { system } = createDrawSystem();
			const item = mockDrawable();
			// First add
			system.addItem(item);
			// Second add
			system.addItem(item);
			const itemCount = system.items.filter(v => v === item).length;

			expect(itemCount).toBe(1);
		})

	})

	describe('removeItem', () => {

		test('Item should be removed from system', () => {
			const { system } = createDrawSystem();
			const item = mockDrawable();
			system.addItem(item);

			system.removeItem(item);
			const exist = system.items.some(v => v === item);

			expect(exist).toBeFalsy();
		})

	})

	describe('draw', () => {

		test('Every item should be drew with painter', () => {
			const { system, painter } = createDrawSystem();
			const item = mockDrawable();
			system.addItem(item);
			system.draw();

			expect(item.draw).toBeCalledWith(painter);
		})

	})

})

function mockDrawable(): Drawable {
	return {
		draw: jest.fn(),
	}
}

function createDrawSystem() {
	const painter = mockPainter();
	const system = new DrawSystem({
		createPainter: () => painter,
	});

	return {
		system,
		painter,
	}
}

function mockPainter() {
	return {} as Painter;
}
