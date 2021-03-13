import { Color, convertValueRange } from 'src/common/color';

describe('Color', () => {

	describe('fromRgba', () => {

		test('valid data', () => {
			const r = 10;
			const g = 10;
			const b = 10;
			const a = 10;
			const color = Color.fromRgba(r, g, b, a);
	
			expect(color.red).toBeCloseTo(r);
			expect(color.green).toBeCloseTo(g);
			expect(color.blue).toBeCloseTo(b);
			expect(color.alpha).toBeCloseTo(a);
		})

	})

	describe('fromRgbaF', () => {

		test('valid data', () => {
			const r = 1;
			const g = 1;
			const b = 1;
			const a = 1;
			const color = Color.fromRgbaF(r, g, b, a);
	
			expect(color.red).toBeCloseTo(255);
			expect(color.green).toBeCloseTo(255);
			expect(color.blue).toBeCloseTo(255);
			expect(color.alpha).toBeCloseTo(255);
		})

	})

})
