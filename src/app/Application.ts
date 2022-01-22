import { Core, Tool } from 'src/core/Core'

export class Application {
  public static create(): Application {
    return new Application()
  }

  constructor() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    this._core = new Core(canvas)
  }

  public run() {
    console.log('Application is running...')

    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    fillScreen(canvas)
    window.addEventListener('resize', () => fillScreen(canvas))
    window.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault()
      },
      { passive: false }
    )
  }

  public switchToSelect() {
    this._core.setTool(Tool.Select)
  }

  public switchToDraw() {
    this._core.setTool(Tool.Draw)
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _core: Core
}

function fillScreen(canvas: HTMLCanvasElement) {
  canvas.style.height = '100vh'
  const ratio = window.devicePixelRatio
  canvas.width = canvas.clientWidth * ratio
  canvas.height = canvas.clientHeight * ratio
}
