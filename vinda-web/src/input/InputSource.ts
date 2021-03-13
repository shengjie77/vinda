import * as EventEmitter from 'eventemitter3';

export class InputSource {

    public on<T extends keyof InputMap>(type: T, handler: (input: InputMap[T]) => any) {}

    public off<T extends keyof InputMap>(type: T, handler: (input: InputMap[T]) => any) {}

    // ------------------------------------------------------- //
    // ---------------  Private Section Below  --------------- //
    // ------------------------------------------------------- //

    private eventBus = new EventEmitter();

}

export enum InputType {

    LeftClick = 'LeftClick',

}

export interface InputMap {

    [InputType.LeftClick]: any;

}


export interface MouseInputHandler {

    onLeftClick(input: Input): void;

    onClick(input: Input): void;

}

export interface Input {}

export type InputHandler = Partial<MouseInputHandler>;
