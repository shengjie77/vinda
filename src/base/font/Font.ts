import { Cloneable, Equalable, cloneProperty } from 'src/base/types'

export class Font extends Cloneable implements Equalable {
  @cloneProperty()
  public size: number = 20

  @cloneProperty()
  public family: string

  @cloneProperty()
  public lineHeight: number = 20

  public static create() {
    return new Font()
  }

  constructor() {
    super()

    this.size = 20
    this.family = 'serif'
  }

  public toCSSString(): string {
    return `${this.size}px ${this.family}`
  }

  public equalTo(v: Font): boolean {
    return this.size === v.size
  }
}
