import { random } from 'faker';
import * as PIXI from '@pixi/math';

import { Matrix, Angle } from 'src/math';
import { fromPIXIMatrix, toPIXIMatrix } from './helper';

describe('Matrix', () => {

	describe('fromIdentity', () => {

		test('Should be a identity matrix', () => {
			const t = Matrix.fromIdentity();
			expect(t.a).toBe(1);
			expect(t.d).toBe(1);
			expect(t.c).toBe(0);
			expect(t.b).toBe(0);
			expect(t.tx).toBe(0);
			expect(t.ty).toBe(0);
		})

	})

	describe('fromScale', () => {

		test('Should be a scale matrix', () => {
			const sx = 2;
			const sy = 3;
			const t = Matrix.fromScale(sx, sy);

			expect(t.a).toBe(sx);
			expect(t.d).toBe(sy);
			expect(t.c).toBe(0);
			expect(t.b).toBe(0);
			expect(t.tx).toBe(0);
			expect(t.ty).toBe(0);
		})

	})

	describe('fromTranslate', () => {

		test('Should be a translate matrix', () => {
			const tx = random.number();
			const ty = random.number();
			const t = Matrix.fromTranslate(tx, ty);

			expect(t.a).toBe(1);
			expect(t.d).toBe(1);
			expect(t.c).toBe(0);
			expect(t.b).toBe(0);
			expect(t.tx).toBe(tx);
			expect(t.ty).toBe(ty);
		})

	})

	describe('fromRotate', () => {

		test('Should be a rotate matrix', () => {
			const angle = Angle.fromDegree(45);
			const expected = fromPIXIMatrix(new PIXI.Matrix().rotate(angle.radian));
			const actual = Matrix.fromRotate(angle);

			expect(actual.equalTo(expected)).toBeTruthy();
		})

	})

	describe('append', () => {

		test('Should get correct answer', () => {
			const m1 = createRandomTransform();
			const m2 = createRandomTransform();
			const expected = fromPIXIMatrix(toPIXIMatrix(m1).append(toPIXIMatrix(m2)));

			expect(m1.append(m2).equalTo(expected)).toBeTruthy();
		})

	})

})

function createRandomTransform() {
	const t = new Matrix();

	t.a = random.number();
	t.d = random.number();
	t.c = random.number();
	t.b = random.number();
	t.tx = random.number();
	t.ty = random.number();

	return t;
}
