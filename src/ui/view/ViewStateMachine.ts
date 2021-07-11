import { ViewState } from './ViewState'

export class ViewStateMachine {
  public switch(currentState: ViewState, eventType: EventType): ViewState {
    const map: SwitchMap = {
      [ViewState.Normal]: {
        mouseenter: ViewState.Hover,
      },
      [ViewState.Hover]: {
        mouseleave: ViewState.Normal,
        mousedown: ViewState.Active,
      },
      [ViewState.Active]: {
        mouseup: ViewState.Hover,
      },
      [ViewState.Disabled]: {},
    }

    const path = map[currentState]
    const targetState = path[eventType]
    return targetState ?? currentState
  }
}

type EventType = keyof HTMLElementEventMap
type SwitchPath = {
  [E in EventType]?: ViewState
}
type SwitchMap = {
  [S in ViewState]: SwitchPath
}
