import { Cloneable, Equalable } from 'src/common/types'

export class Font implements Cloneable, Equalable {
  public size: number = 20
  public family: string

  public static create() {
    return new Font()
  }

  constructor() {
    this.size = 20
    this.family = 'PingFang SC'
  }

  public toCSSString(): string {
    return `${this.size}px ${this.family}`
  }

  public clone(): Font {
    const f = new Font()
    f.size = this.size
    return f
  }

  public equalTo(v: Font): boolean {
    return this.size === v.size
  }
}
