import { Style } from './Style'

export enum CursorType {
  Default = 'default',
  Pointer = 'pointer',
}

export class CursorStyle implements Style {
  public type: CursorType = CursorType.Default

  public static create(type: CursorType = CursorType.Default): CursorStyle {
    const s = new CursorStyle()
    s.type = type
    return s
  }

  public clone(): CursorStyle {
    const s = new CursorStyle()
    s.type = this.type

    return s
  }
}
