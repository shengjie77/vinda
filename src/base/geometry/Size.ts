import { Equalable, Cloneable, cloneProperty } from 'src/base/types'

const DEFAULT_PARAM: SizeParam = {
  width: 0,
  height: 0,
}

export class Size extends Cloneable implements Equalable {
  public static create(param?: Partial<SizeParam>) {
    return new Size(param)
  }

  constructor(param: Partial<SizeParam> = DEFAULT_PARAM) {
    super()

    this.width = param.width ?? DEFAULT_PARAM.width
    this.height = param.height ?? DEFAULT_PARAM.height
  }

  set width(v: number) {
    this._width = v
  }

  get width(): number {
    return this._width
  }

  set height(v: number) {
    this._height = v
  }

  get height(): number {
    return this._height
  }

  public expand(w: number, h: number) {
    this._width += w
    this._height += h
  }

  public isEmpty(): boolean {
    return this.width === 0 && this.height === 0
  }

  public isValid() {
    return this.width >= 0 && this.height >= 0
  }

  public equalTo(other: Size) {
    return this.width === other.width && this.height === other.height
  }

  public toString() {
    return `Size(${this.width}, ${this.height})`
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  @cloneProperty()
  private _width: number = 0

  @cloneProperty()
  private _height: number = 0
}

export interface SizeParam {
  width: number
  height: number
}
