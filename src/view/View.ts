import { Painter } from 'src/core/painter'
import { Rect, RoundedRect } from 'src/common/geometry';

import { Background } from './Background';
import { Border } from './Border';

export class View {

	public static create(): View {
		return new View();
	}

	public border: Border = Border.create();
	public background: Background = Background.create();

	public rect: Rect = new Rect();

	public onPaint(painter: Painter) {
		this.paintBackground(painter, this.background);
		this.paintBorder(painter, this.border);
	}

	// ------------------------------------------------------- //
	// ---------------  Private Section Below  --------------- //
	// ------------------------------------------------------- //

	private paintBorder(painter: Painter, border: Border) {
		painter.save();
		const outerRounedRect = new RoundedRect({
			x: this.rect.x,
			y: this.rect.y,
			width: this.rect.width,
			height: this.rect.height,
		}, this.border.radius)
		const outerPath = outerRounedRect.toPath2D();
		const innerRoundedRect = outerRounedRect.clone().shrink(this.border.width);
		innerRoundedRect.radius = this.border.radius - this.border.width >= 0
			? this.border.radius - this.border.width
			: 0
		const innerPath = innerRoundedRect.toPath2D();
		const clipPath = new Path2D();
		clipPath.addPath(outerPath);
		clipPath.addPath(innerPath);
		painter.clipPath = clipPath;
		painter.brush.color = border.color;
		painter.fillRoundedRect(this.rect, border.radius, border.radius);

		painter.restore();
	}

	private paintBackground(painter: Painter, background: Background) {
		const innerRect = this.rect.clone().shrink(this.border.width);
		painter.save();
		painter.brush.color = background.color;
		painter.fillRect(innerRect);
		painter.restore();
	}

}
