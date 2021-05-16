import { Rect } from 'src/common/geometry';

describe('Rect', () => {

	describe('clone', () => {

		test('normal', () => {
			const rect = Rect.create({
				x: 10,
				y: 20,
				width: 200,
				height: 100,
			})

			const clonedRect = rect.clone();
			expect(clonedRect.x).toEqual(rect.x);
			expect(clonedRect.y).toEqual(rect.y);
			expect(clonedRect.width).toEqual(rect.width);
			expect(clonedRect.height).toEqual(rect.height);
		})

	})

})
