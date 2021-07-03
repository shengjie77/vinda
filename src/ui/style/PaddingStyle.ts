import { Style } from './Style'

export class PaddingStyle implements Style {
  public top: number = 0
  public bottom: number = 0
  public left: number = 0
  public right: number = 0

  public static create(param: PaddingStyleParam = 0): PaddingStyle {
    const v = new PaddingStyle()
    v.update(param)

    return v
  }

  public update(p: PaddingStyleParam) {
    if (isParamV1(p)) {
      this.updateWithParamV1(p)
    } else if (isParamV2(p)) {
      this.updateWithParamV2(p)
    } else if (isParamV3(p)) {
      this.updateWithParamV3(p)
    } else {
      console.warn('Invalid param format!')
    }
  }

  public clone(): PaddingStyle {
    return PaddingStyle.create({
      top: this.top,
      bottom: this.bottom,
      left: this.left,
      right: this.right,
    })
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private updateWithParamV1(p: ParamV1) {
    this.top = p
    this.bottom = p
    this.left = p
    this.right = p
  }

  private updateWithParamV2(p: ParamV2) {
    const { horizontal, vertical } = p

    this.top = vertical
    this.bottom = vertical
    this.left = horizontal
    this.right = horizontal
  }

  private updateWithParamV3(p: ParamV3) {
    this.top = p.top
    this.bottom = p.bottom
    this.left = p.left
    this.right = p.right
  }
}

type PaddingStyleParam = ParamV1 | ParamV2 | ParamV3

type ParamV1 = number
type ParamV2 = { horizontal: number; vertical: number }
type ParamV3 = { top: number; bottom: number; left: number; right: number }

function isParamV1(v: PaddingStyleParam): v is ParamV1 {
  return typeof v === 'number'
}

function isParamV2(v: PaddingStyleParam): v is ParamV2 {
  return (v as ParamV2).horizontal !== undefined
}

function isParamV3(v: PaddingStyleParam): v is ParamV3 {
  return (v as ParamV3).left !== undefined
}
