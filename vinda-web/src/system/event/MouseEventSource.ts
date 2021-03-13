import { EventSource } from 'src/system/event';

export class MouseEventSource extends EventSource<MouseEventMap> {

    constructor(el: HTMLElement) {
        super();

        this.bindEvent(el);
    }

    // ------------------------------------------------------- //
    // ---------------  Private Section Below  --------------- //
    // ------------------------------------------------------- //

    private bindEvent(el: HTMLElement) {
        el.addEventListener('click', (ev) => {
            console.log('from MouseEventSource', ev.button);
            this.eventBus.emit(MouseEventType.LeftClick, {});
        })
    }

}


export enum MouseEventType {

    LeftClick = 'LeftClick',

    Click = 'Click',

}

export type MouseEventPayload = any;

export interface MouseEventMap {

    [MouseEventType.LeftClick]: MouseEventPayload;

    [MouseEventType.Click]: MouseEventPayload;

}
