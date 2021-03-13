import { random } from 'faker';

import { LineEntity } from 'src/entity';
import { Line } from 'src/math';
import { MockPainter } from 'src/test/mock';

describe('LineEntity', () => {

	describe('draw', () => {
		
		test('Painter.strokeLine should be invoked', async () => {
			const painter = new MockPainter();
			const line = Line.create({
				x1: random.number(),
				y1: random.number(),
				x2: random.number(),
				y2: random.number(),
			});
			const entity = new LineEntity({
				line,
			});

			entity.draw(painter);

			expect(painter.strokeLine).toBeCalledWith(expect.any(Line));
		})

	})

})

