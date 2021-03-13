import { isEqual } from 'src/common';
import { degreeToRadian, radianToDegree } from 'src/math';
import { Cloneable } from 'src/types';

/**
 * 正值代表从 x 轴正向向 y 轴正向旋转,
 * 在屏幕坐标系下就是顺时针旋转
 *
 * @export
 * @class Angle
 */
export class Angle implements Cloneable {

	public static fromDegree(deg: number): Angle {
		const angle = new Angle();
		angle.degree = deg;

		return angle;
	}

	public static fromRadian(rad: number): Angle {
		const angle = new Angle();
		angle.radian = rad;

		return angle;
	}

	public set degree(deg: number) {
		this.radian = degreeToRadian(deg);
	}

	public get degree(): number {
		return radianToDegree(this.radian);
	}

	public set radian(rad: number) {
		this._radian = rad;
	}

	public get radian(): number {
		return this._radian;
	}

	public clone(): Angle {
		return Angle.fromRadian(this.radian);
	}

	public equalTo(a: Angle): boolean {
		const v1 = this.normalize(this.radian);
		const v2 = this.normalize(a.radian);
		return isEqual(v1, v2);
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //

	/**
	 * Radian ranges from 0 to 2Pi
	 *
	 * @private
	 * @param {number} radian
	 * @returns {number}
	 * @memberof Angle
	 */
	private normalize(radian: number): number {
		const result = radian % (Math.PI * 2);
		return result < 0 ? result + Math.PI * 2 : result;
	}

	private _radian: number = 0;

}
