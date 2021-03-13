import { convertValueRange, IntegerRange, FloatRange } from 'src/common/color';

describe('convertValuerange', () => {

	test('from integer to float', () => {
		const input = 0;
		const output = 0;

		const result = convertValueRange(input, IntegerRange, FloatRange);
		expect(result).toBeCloseTo(output);
	})

	test('from float to integer', () => {
		const input = 1;
		const output = 255;

		const result = convertValueRange(input, FloatRange, IntegerRange);
		expect(result).toBeCloseTo(output);
	})

})
