export interface ViewHost {
  requestPaint(): void
}

export class EmptyViewHost implements ViewHost {
  public static create(): EmptyViewHost {
    return new EmptyViewHost()
  }

  public requestPaint(): void {}
}
