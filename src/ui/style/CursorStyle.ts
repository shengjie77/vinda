import { cloneProperty } from 'src/base/types'

import { Style } from './Style'

export enum CursorType {
  Default = 'default',
  Pointer = 'pointer',
}

export class CursorStyle extends Style {
  @cloneProperty()
  public type: CursorType = CursorType.Default

  public static create(type: CursorType = CursorType.Default): CursorStyle {
    const s = new CursorStyle()
    s.type = type
    return s
  }
}
