import { Angle } from 'src/math';

describe('Angle', () => {

	describe('equalTo', () => {

		test('值相差 360 度的整数倍也相同', () => {
			const degree = 15;
			const a1 = Angle.fromDegree(degree);
			const a2 = Angle.fromDegree(degree - 360 * 3);

			expect(a1.equalTo(a2)).toBeTruthy();
		})

	})

})
