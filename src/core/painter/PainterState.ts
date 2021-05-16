import { Pen, Brush } from 'src/core/painter';
import { Cloneable } from 'src/common';
import { Transform } from 'src/common/geometry';
import { Optional } from 'src/common/types';

export class PainterState implements Cloneable {

	public pen: Pen = new Pen();
	public brush: Brush = new Brush();
	public clipPath: Optional<Path2D> = undefined;

	public transform: Transform = Transform.fromIdentity();
    
	constructor() {
		const { x, y } = this.transform.scale;
		const ratio = window.devicePixelRatio;
		this.transform.scale.x = x * ratio;
		this.transform.scale.y = y * ratio;
	}

	public clone(): PainterState {
		const state = new PainterState();

		state.pen = this.pen.clone();
		state.brush = this.brush.clone();
		state.transform = this.transform.clone();
		state.clipPath = this.clipPath ? new Path2D(this.clipPath) : undefined;

		return state;
	}

	public equalTo(state: PainterState) {
		return this.pen.equalTo(state.pen)
			&& this.brush.equalTo(state.brush)
			&& this.transform.equalTo(state.transform)
	}

}
