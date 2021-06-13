import { Rect, Size } from 'src/common/geometry';

import { LayoutEntity } from './LayoutEntity';
import { SizePolicy } from './SizePolicy';

export abstract class Layout {

	constructor(host: LayoutEntity) {
		this.#host = host;
	}

	public abstract build(host: LayoutEntity): void;

	public abstract calculateContentSize(): Size;

	protected get host(): LayoutEntity {
		return this.#host;
	}

	#host: LayoutEntity;
}

export class ColumnLayout extends Layout {
	public static create(host: LayoutEntity) {
		return new ColumnLayout(host);
	}

	public override build(parent: LayoutEntity): void {
		const contentSize = this.calculateContentSize();
		this.host.setActualBounds(Rect.create({
			x: 0,
			y: 0,
			width: contentSize.width,
			height: contentSize.height,
		}))

		this.host.getChildLayoutEntities()
			.reduce((y: number, e: LayoutEntity) => {
				const size = e.getLayout().calculateContentSize();
				const bounds = Rect.create({
					x: 0,
					y: y,
					width: size.width,
					height: size.height,
				})
				e.setActualBounds(bounds);
				y += size.height;
				return y;
			}, 0);
	}

	public override calculateContentSize(): Size {
		const size = Size.create();

		const preferredSize = this.host.getLayoutSize();
		const { horizontal, vertical } = this.host.getSizePolicy();

		const contentSize = this.host.getChildLayoutEntities().reduce((size: Size, entity) => {
			const { width, height } = entity.getLayout().calculateContentSize();
			size.height += height;
			size.width = Math.max(size.width, width);
			return size;
		}, Size.create());

		if (horizontal == SizePolicy.Fixed) {
			size.width = preferredSize.width;
		} else {
			size.width = contentSize.width;
		}

		if (vertical == SizePolicy.Fixed) {
			size.height = preferredSize.height;
		} else {
			size.height = contentSize.height;
		}

		return size;
	}
}
