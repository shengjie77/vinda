
export function degreeToRadian(angle: number) {
	const radian = (angle / 180) * Math.PI;
	return radian;
}

export function radianToDegree(radian: number) {
	const degree = (radian / Math.PI) * 180;
	return degree;
}

export interface PointLike {
	x: number;
	y: number;
}
