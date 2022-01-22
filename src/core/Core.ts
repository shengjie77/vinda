import { assertIsDefined } from 'src/base/utils'
import { EventName } from 'src/core/feature'
import { World } from 'src/core/World'
import { drawState, selectState, State } from 'src/core/State'
import { RenderSystem } from 'src/core/system'

export class Core {
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._ctx = canvas.getContext('2d')!
    this._renderSystem = new RenderSystem()

    this.bindEvents()
    this.initStateMap()
  }

  public setTool(tool: Tool) {
    this._tool = tool
  }

  // ------------------------------------------------------- //
  // ------------------  Private Methods  ------------------ //
  // ------------------------------------------------------- //
  private initStateMap() {
    this._stateMap.set(Tool.Select, selectState).set(Tool.Draw, drawState)
  }

  private bindEvents() {
    this._canvas.addEventListener('mousedown', (ev) => {
      this.dispatch('mousedown', ev)
    })

    this._canvas.addEventListener('mousemove', (ev) => {
      this.dispatch('mousemove', ev)
    })

    this._canvas.addEventListener('mouseup', (ev) => {
      this.dispatch('mouseup', ev)
    })

    requestAnimationFrame(this.scheduleRender)
  }

  private dispatch(name: EventName, ev: MouseEvent) {
    const state = this._stateMap.get(this._tool)
    assertIsDefined(state, `Cannot find state by tool(${this._tool})`)

    for (const feat of state.features) {
      const handled = feat.dispatchEvent(name, ev, this._world)
      if (handled) {
        break
      }
    }
  }

  private scheduleRender = () => {
    this._renderSystem.render(this._ctx, this._world)

    requestAnimationFrame(this.scheduleRender)
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _canvas: HTMLCanvasElement
  private _ctx: CanvasRenderingContext2D
  private _stateMap: Map<Tool, State> = new Map()
  private _tool: Tool = Tool.Select
  private _world: World = new World()
  private _renderSystem: RenderSystem
}

export enum Tool {
  Select,
  Draw,
}
