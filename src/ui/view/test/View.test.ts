// import { View } from 'src/ui/view'
// import { Rect } from 'src/common/geometry'
// import { createMockPainter } from 'src/mock'

describe.skip('View', () => {
  test('empty', () => {
    expect(1).toBe(1)
  })
  // describe('onPaint', () => {
  //   test('With solid border', () => {
  //     const view = View.create()
  //     const painter = createMockPainter()
  //     view.border.width = 1
  //     view.onPaint(painter)
  //     expect(painter.save).toBeCalled()
  //     expect(painter.fillRoundedRect).toBeCalledWith(
  //       expect.any(Rect),
  //       view.border.radius,
  //       view.border.radius
  //     )
  //     expect(painter.restore).toBeCalled()
  //   })
  // })
  // describe('getPaintRect()', () => {
  //   test('Without parent', () => {
  //     const v = View.create()
  //     const x = 20
  //     const y = 20
  //     const w = 256
  //     const h = 256
  //     v.set = Rect.create({ x: x, y: y, width: w, height: h })
  //     const actual = v.getGlobalRect()
  //     expect(actual.x).toBe(x)
  //     expect(actual.y).toBe(y)
  //     expect(actual.width).toBe(w)
  //     expect(actual.height).toBe(h)
  //   })
  //   test('As child', () => {
  //     const parent = View.create()
  //     const px = 20
  //     const py = 20
  //     parent.bounds = Rect.create({ x: px, y: py, width: 512, height: 256 })
  //     const child = View.create()
  //     const cx = 0
  //     const cy = 0
  //     const cw = 50
  //     const ch = 50
  //     child.bounds = Rect.create({ x: cx, y: cy, width: cw, height: ch })
  //     parent.addChild(child)
  //     const actual = child()
  //     expect(actual.x).toBe(px + cx)
  //     expect(actual.y).toBe(py + cy)
  //     expect(actual.width).toBe(cw)
  //     expect(actual.height).toBe(ch)
  //   })
  // })
})
