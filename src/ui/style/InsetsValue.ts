import { cloneProperty } from 'src/base/types'

import { Style } from './Style'

export class InsetsValue extends Style {
  @cloneProperty()
  public top: number = 0

  @cloneProperty()
  public bottom: number = 0

  @cloneProperty()
  public left: number = 0

  @cloneProperty()
  public right: number = 0

  public static create(param: InsetsValueParam = 0): InsetsValue {
    const v = new InsetsValue()
    v.update(param)

    return v
  }

  public update(p: InsetsValueParam) {
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

type InsetsValueParam = ParamV1 | ParamV2 | ParamV3

type ParamV1 = number
type ParamV2 = { horizontal: number; vertical: number }
type ParamV3 = { top: number; bottom: number; left: number; right: number }

function isParamV1(v: InsetsValueParam): v is ParamV1 {
  return typeof v === 'number'
}

function isParamV2(v: InsetsValueParam): v is ParamV2 {
  return (v as ParamV2).horizontal !== undefined
}

function isParamV3(v: InsetsValueParam): v is ParamV3 {
  return (v as ParamV3).left !== undefined
}
