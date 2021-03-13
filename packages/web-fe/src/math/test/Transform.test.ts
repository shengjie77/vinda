import * as PIXI from '@pixi/math';
import { random } from 'faker';

import { Transform } from 'src/math';
import { fromPIXIMatrix } from './helper';

describe('Transform', () => {

	describe('toMatrix', () => {

		test('Should get a correct matrix', () => {
			const tx = random.number();
			const ty = random.number();
			const sx = random.number();
			const sy = random.number();
			const rad = random.number();

			const t = new Transform();
			t.translate(tx, ty);
			t.scale.x = sx;
			t.scale.y = sy;
			t.rotation.radian = rad;

			const pixiTransform = new PIXI.Transform();
			pixiTransform.position.x = tx;
			pixiTransform.position.y = ty;
			pixiTransform.scale.x = sx;
			pixiTransform.scale.y = sy;
			pixiTransform.rotation = rad;
			pixiTransform.updateLocalTransform();
			const expected = fromPIXIMatrix(pixiTransform.localTransform)
			
			expect(t.toMatrix().equalTo(expected)).toBeTruthy();
		})

	})

})
