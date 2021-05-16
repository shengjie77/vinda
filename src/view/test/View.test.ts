import { View } from "src/view";
import { Rect } from "src/common/geometry";
import { createMockPainter } from 'src/mock';

describe('View', () => {

	describe('onPaint', () => {

		test('With solid border', () => {
			const view = View.create();
			view.rect = Rect.create({ x: 0, y: 0, width: 100, height: 40});
			const painter = createMockPainter();
			view.border.width = 1;

			view.onPaint(painter);

			expect(painter.save).toBeCalled();
			expect(painter.fillRoundedRect).toBeCalledWith(
				expect.any(Rect),
				view.border.radius,
				view.border.radius,
			)
			expect(painter.restore).toBeCalled();
		})

	})

})


