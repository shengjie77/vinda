import { Rect } from 'src/common/geometry'

describe('Rect', () => {
  describe('clone', () => {
    test('normal', () => {
      const rect = Rect.create({
        x: 10,
        y: 20,
        width: 200,
        height: 100,
      })

      const clonedRect = rect.clone()
      expect(clonedRect.x).toEqual(rect.x)
      expect(clonedRect.y).toEqual(rect.y)
      expect(clonedRect.width).toEqual(rect.width)
      expect(clonedRect.height).toEqual(rect.height)
    })
  })

  test('topLeft', () => {
    const x = 10
    const y = 20
    const rect = Rect.create({
      x,
      y,
      width: 200,
      height: 100,
    })

    const pos = rect.topLeft
    expect(pos.x).toEqual(x)
    expect(pos.y).toEqual(y)
  })

  test('topRight', () => {
    const left = 10
    const right = 100
    const top = 20
    const bottom = 120
    const rect = Rect.create({
      left,
      right,
      top,
      bottom,
    })

    const pos = rect.topRight
    expect(pos.x).toEqual(right)
    expect(pos.y).toEqual(top)
  })

  test('bottomLeft', () => {
    const left = 10
    const right = 100
    const top = 20
    const bottom = 120
    const rect = Rect.create({
      left,
      right,
      top,
      bottom,
    })

    const pos = rect.bottomLeft
    expect(pos.x).toEqual(left)
    expect(pos.y).toEqual(bottom)
  })

  test('bottomRight', () => {
    const left = 10
    const right = 100
    const top = 20
    const bottom = 120
    const rect = Rect.create({
      left,
      right,
      top,
      bottom,
    })

    const pos = rect.bottomRight
    expect(pos.x).toEqual(right)
    expect(pos.y).toEqual(bottom)
  })
})
