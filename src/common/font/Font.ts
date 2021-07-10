import { Cloneable, Equalable } from 'src/common/types'

export class Font implements Cloneable, Equalable {
  public size: number = 20
  public family: string
  public lineHeight: number = 20

  public static create() {
    return new Font()
  }

  constructor() {
    this.size = 20
    this.family = 'serif'
  }

  public toCSSString(): string {
    return `${this.size}px ${this.family}`
  }

  public clone(): Font {
    const f = new Font()
    f.size = this.size
    f.family = this.family
    return f
  }

  public equalTo(v: Font): boolean {
    return this.size === v.size
  }
}
