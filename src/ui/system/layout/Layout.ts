import { View } from 'src/ui/view'

export enum MainAxisAlignment {
  Start,
  Center,
  End,
  SpaceBetween,
  SpaceEvenly,
}

export enum CrossAxisAlignment {
  Start,
  End,
  Center,
  Stretch,
}

export abstract class Layout {
  public abstract build(host: View): void
}
