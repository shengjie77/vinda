import { Rect } from 'src/common/geometry';
import { Painter } from 'src/core/painter';
import { View } from 'src/view';

class Border {

}

export class Button extends View {

	public onPaint(painter: Painter) {
		const rect = Rect.from({x: 10, y: 10, width: 100, height: 40})
		painter.strokeRoundedRect(rect, 4)
		rect.x = 120
		painter.strokeRect(rect)
	}

}
