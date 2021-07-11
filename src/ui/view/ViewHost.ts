import { CursorType, ViewStylesheet } from 'src/ui/style'

export interface ViewHost {
  requestPaint(): void
  applyStylesheet(ss: ViewStylesheet): void
}

export class EmptyViewHost implements ViewHost {
  public static create(): EmptyViewHost {
    return new EmptyViewHost()
  }

  public requestPaint(): void {}
  public applyStylesheet(ss: ViewStylesheet) {}
}
