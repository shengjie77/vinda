import { assertIsDefined } from 'src/common'
import { EventName } from 'src/core/feature'
import { drawState, selectState, State } from './State'

export class Core {
  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas

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
    this._stateMap
      .set(Tool.Select, selectState)
      .set(Tool.Draw, drawState)
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
  }

  private dispatch(name: EventName, ev: MouseEvent) {
    const state = this._stateMap.get(this._tool)
    assertIsDefined(state, `Cannot find state by tool(${this._tool})`)

    for (const feat of state.features) {
      const handled = feat.dispatchEvent(name, ev)
      if (handled) {
        break
      }
    }
  }

  // ------------------------------------------------------- //
  // -----------------  Private Properties  ---------------- //
  // ------------------------------------------------------- //
  private _canvas: HTMLCanvasElement
  private _stateMap: Map<Tool, State> = new Map()
  private _tool: Tool = Tool.Select
}

export enum Tool {
  Select,
  Draw,
}
