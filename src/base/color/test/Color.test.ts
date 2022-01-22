import { Color } from 'src/base/color'

describe('Color', () => {
  describe('fromCSS', () => {
    test('hex', () => {
      const color = Color.fromCSS('#0078d4')
      expect(color.red).toBe(0)
      expect(color.green).toBe(120)
      expect(color.blue).toBe(212)
    })
  })
})
