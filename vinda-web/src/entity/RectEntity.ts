import { Entity } from 'src/entity';
import { Rect, RectParameter } from 'src/math';
import { Painter } from 'src/painter';
import { Drawable } from 'src/system';

export class RectEntity extends Entity implements Drawable {

    public static create(param: RectEntityParameter): RectEntity {
        return new RectEntity(param);
    }

    constructor(param: RectEntityParameter) {
        super();

        this.rect = Rect.create(param.rect);
    }

    public draw(p: Painter) {
        p.strokeRect(this.rect);
    }

    // ------------------------------------------------------- //
    // ---------------  Private Section Below  --------------- //
    // ------------------------------------------------------- //

    private rect: Rect;

}

export interface RectEntityParameter {
    rect: Rect | RectParameter;
}
