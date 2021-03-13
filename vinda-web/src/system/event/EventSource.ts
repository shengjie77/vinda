import { EventEmitter } from 'eventemitter3';

export class EventSource<EventMap> {

    public on<E extends keyof EventMap>(name: E, handler: (ev: EventMap[E]) => any) {
        console.log('bind', name)
        this.eventBus.on(name as string, handler);
    }


    public off<E extends keyof EventMap>(name: E, handler: (ev: EventMap[E]) => any) {
        this.eventBus.off(name as string, handler);
    }

    protected eventBus = new EventEmitter();

}
