import { State } from 'src/state';
import { Page } from 'src/core';
import { Vector2 } from 'src/math';
import { LineEntity } from 'src/entity';
import { assertNotNullable } from 'src/common';

export class LineState implements State {

    constructor(page: Page) {
        this.page = page;
    }

    public onLeftClick(ev: MouseEvent) {
        const start = Vector2.from(20, 20);
        const end = Vector2.from(200, 200);
        this.session.isActive ? this.finishLine(start) : this.startLine(end);
    }

    // ------------------------------------------------------- //
    // ---------------  Private Section Below  --------------- //
    // ------------------------------------------------------- //

    private page: Page;

    private lineEntity?: LineEntity;

    private session: LineSession = new LineSession();

    private startLine(pt: Vector2) {
        this.session.start();

        this.lineEntity = this.page.addLine({
            p1: pt,
            p2: pt,
        })
    }

    private finishLine(pt: Vector2) {
        this.session.finish();

        assertNotNullable(this.lineEntity);
    }

}

class LineSession {

    public isActive: boolean = false;

    public start() {
        this.isActive = true;
    }

    public finish() {
        this.isActive = false;
    }

}
