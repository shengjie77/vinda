import { DrawSystem } from 'src/system';
import { LineEntity, RectEntity } from 'src/entity';
import {
    Line,
    LineParameter,
    Rect,
    RectParameter,
} from 'src/math';

export class Page {

    constructor(canvas: HTMLCanvasElement) {
        this.drawSystem = DrawSystem.fromCanvas(canvas);
    }

    public addLine(line: Line | LineParameter): LineEntity {
        const e = new LineEntity({ line });

        this.drawSystem.addItem(e);
        this.drawSystem.draw();

        return e;
    }

    public addRect(rect: Rect | RectParameter): RectEntity {
        const e = RectEntity.create({ rect });
        this.drawSystem.addItem(e);
        this.drawSystem.draw();

        return e;
    }

    // ------------------------------------------------------- //
    // ---------------  Private Section Below  --------------- //
    // ------------------------------------------------------- //

    private drawSystem: DrawSystem;

}
