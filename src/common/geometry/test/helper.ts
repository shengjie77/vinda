import * as PIXI from '@pixi/math'
import { Matrix } from 'src/common/geometry'

export function fromPIXIMatrix(m: PIXI.Matrix) {
  return Matrix.fromArray([m.a, m.b, m.c, m.d, m.tx, m.ty])
}

export function toPIXIMatrix(m: Matrix) {
  return new PIXI.Matrix(m.a, m.b, m.c, m.d, m.tx, m.ty)
}
