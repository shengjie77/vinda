import { Line } from 'src/common/geometry';
import { Painter } from 'src/core/painter';
import { Drawable } from 'src/core';

import { Entity } from './Entity';

export class LineEntity extends Entity implements Drawable {

  constructor() {
    super();

    this.line_ = Line.from({
      x1: 0,
      y1: 0,
      x2: 100,
      y2: 100,
    })
  }

  public draw(painter: Painter) {
    painter.strokeLine(this.line_);
  }

  // ------------------------------------------------------- //
  // ---------------  Private Section Below  --------------- //
  // ------------------------------------------------------- //
  private line_: Line;

}
