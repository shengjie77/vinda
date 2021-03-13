import { Vector2, Angle, Matrix } from 'src/math';
import { Cloneable } from 'src/types';

/**
 * Transform order: scale -> rotate -> translate
 *
 * @export
 * @class Transform
 * @implements {Cloneable}
 */
export class Transform implements Cloneable {

	public static fromIdentity(): Transform {
		return new Transform();
	}

	public translation: Vector2 = new Vector2();

	public scale: Vector2 = new Vector2(1, 1);

	public rotation: Angle = new Angle();

	public translate(tx: number, ty: number) {
		this.translation.x += tx;
		this.translation.y += ty;
	}

	public toMatrix(): Matrix {
		return Matrix.fromIdentity()
			.translate(this.translation.x, this.translation.y)
			.rotate(this.rotation)
			.scale(this.scale.x, this.scale.y)
	}

	public clone(): Transform {
		const t = Transform.fromIdentity();

		t.translation = this.translation.clone();
		t.scale = this.scale.clone();
		t.rotation = this.rotation.clone();

		return t;
	}

	public equalTo(t: Transform): boolean {
		return this.translation.equalTo(t.translation)
			&& this.scale.equalTo(t.scale)
			&& this.rotation.equalTo(t.rotation)
	}

}
