/**
 * So far it's still tedious to write tests about canvas rendering.
 * In order to avoid too much boilerlate code, Put all canvas related
 * tests in this file.
 */

import * as puppeteer from 'puppeteer'
import { screenshotOf } from 'src/test/screenshotOf'

// This is import is for type intelligence
import * as vinda from 'src/index'

describe.skip('Canvas Test', () => {
  let browser: puppeteer.Browser | undefined = undefined
  beforeAll(async () => {
    browser = await puppeteer.launch()
  })

  afterAll(async () => {
    if (browser) {
      await browser.close()
    }
  })

  describe('CanvasPainter', () => {
    describe('strokeRect', () => {
      test('Stroke rect with default state', async () => {
        const image = await screenshotOf(browser!, () => {
          const { Rect, CanvasPainter } = vinda

          const canvas = document.getElementById('canvas') as HTMLCanvasElement
          const ctx = canvas.getContext('2d')!
          const painter = new CanvasPainter(ctx)

          const rect = Rect.create({
            x: 200,
            y: 200,
            width: 100,
            height: 100,
          })
          painter.strokeRect(rect)
        })

        expect(image).toMatchImageSnapshot()
      })
    })

    describe('fillRect', () => {
      test('Fill rect with default state', async () => {
        const image = await screenshotOf(browser!, () => {
          const { Rect, CanvasPainter } = vinda

          const canvas = document.getElementById('canvas') as HTMLCanvasElement
          const ctx = canvas.getContext('2d')!
          const painter = new CanvasPainter(ctx)

          const rect = Rect.create({
            x: 100,
            y: 100,
            width: 100,
            height: 100,
          })
          painter.fillRect(rect)
        })

        expect(image).toMatchImageSnapshot()
      })
    })

    describe('strokeLine', () => {
      test('Stroke line with default state', async () => {
        const image = await screenshotOf(browser!, () => {
          const { Line, CanvasPainter } = vinda

          const canvas = document.getElementById('canvas') as HTMLCanvasElement
          const ctx = canvas.getContext('2d')!
          const painter = new CanvasPainter(ctx)

          const line = Line.from({
            x1: 100,
            y1: 100,
            x2: 200,
            y2: 200,
          })

          painter.strokeLine(line)
        })

        expect(image).toMatchImageSnapshot()
      })
    })

    describe('strokePath', () => {
      test('Path consists of a line', async () => {
        const image = await screenshotOf(browser!, () => {
          const { Path, CanvasPainter, Vector } = vinda
          const canvas = document.getElementById('canvas') as HTMLCanvasElement
          const ctx = canvas.getContext('2d')!
          const painter = new CanvasPainter(ctx)

          const path = new Path()
          path.moveTo(
            Vector.create({
              x: 0,
              y: 0,
            })
          )

          path.lineTo(
            Vector.create({
              x: 100,
              y: 100,
            })
          )
          painter.strokePath(path)
        })

        expect(image).toMatchImageSnapshot()
      })
    })

    describe('fillPath', () => {
      test('Path consists of a rect', async () => {
        const image = await screenshotOf(browser!, () => {
          const { Path, CanvasPainter, Vector } = vinda
          const canvas = document.getElementById('canvas') as HTMLCanvasElement
          const ctx = canvas.getContext('2d')!
          const painter = new CanvasPainter(ctx)

          const path = new Path()
          path.moveTo(
            Vector.create({
              x: 0,
              y: 0,
            })
          )

          path.lineTo(
            Vector.create({
              x: 100,
              y: 0,
            })
          )
          path.lineTo(
            Vector.create({
              x: 100,
              y: 100,
            })
          )

          path.lineTo(
            Vector.create({
              x: 0,
              y: 100,
            })
          )

          path.close()
          painter.fillPath(path)
        })

        expect(image).toMatchImageSnapshot()
      })
    })
  })
})
