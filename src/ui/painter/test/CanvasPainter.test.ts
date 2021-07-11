import { Pen, CanvasPainter, Brush, PainterState } from 'src/ui/painter'
import { Rect } from 'src/common/geometry'
import { createMock } from 'src/mock'

describe.skip('CanvasPainter', () => {
  describe('pen', () => {
    test('Initial pen should be a new pen', () => {
      const { painter } = createPainter()
      const expectPen = new Pen()

      expect(painter.pen.equalTo(expectPen)).toBeTruthy()
    })
  })

  describe('brush', () => {
    test('Initial bursh should be a new brush', () => {
      const { painter } = createPainter()
      const expectBrush = new Brush()

      expect(painter.brush.equalTo(expectBrush)).toBeTruthy()
    })
  })

  describe('save & restore', () => {
    test('Painter state should be restored to last saved', () => {
      const { painter } = createPainter()
      const originState = getCurrentState(painter)
      painter.save()

      modifyState(painter)
      let currentState = getCurrentState(painter)
      expect(originState.equalTo(currentState)).toBeFalsy()

      painter.restore()
      currentState = getCurrentState(painter)
      expect(originState.equalTo(currentState)).toBeTruthy()
    })

    function getCurrentState(painter: CanvasPainter) {
      const state = new PainterState()
      state.pen = painter.pen.clone()
      state.brush = painter.brush.clone()

      return state
    }

    function modifyState(painter: CanvasPainter) {
      painter.pen.width += 1
    }
  })

  describe('fillRect', () => {
    test('normal', () => {
      const { painter, ctx } = createPainter()
      const rect = Rect.create()
      painter.fillRect(rect)

      expect(ctx.fillStyle).toEqual(painter.brush.color.toCSSColor())
    })
  })
})

function createPainter() {
  const ctx = createMock<CanvasRenderingContext2D>()
  const painter = new CanvasPainter(ctx)

  return { painter, ctx }
}
