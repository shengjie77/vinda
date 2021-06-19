import { LayoutEntity } from './LayoutEntity'

export abstract class Layout {
  public abstract build(host: LayoutEntity): void
}
