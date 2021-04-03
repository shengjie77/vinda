
export function isEqual(v1: number, v2: number): boolean {
	const precision = 0.000001;
	return Math.abs(v1 - v2) < precision;
}
