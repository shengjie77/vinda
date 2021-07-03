import { View } from 'src/view'

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

export interface Flex {
  basis: number
  ratio: number
}

export abstract class Layout {
  public abstract build(host: View): void
}
