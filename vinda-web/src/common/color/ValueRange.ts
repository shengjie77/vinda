
export type ValueRange = [minValue: number, maxValue: number];

export const IntegerRange: ValueRange = [0, 255];
export const FloatRange: ValueRange = [0, 1];

export function convertValueRange(value: number, from: ValueRange, to: ValueRange) {
	const ratio = (value - from[0]) / (from[1] - from[0]);
	const result = (to[1] - to[0]) * ratio + to[0];

	return result;
}