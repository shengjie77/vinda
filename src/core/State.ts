import {
  Feature,
  SelectFeature,
  DrawFeature,
  MoveCanvasFeature,
} from 'src/core/feature'

export interface State {
  features: Feature[]
}

export const selectState: State = {
  features: [new MoveCanvasFeature(), new SelectFeature()],
}

export const drawState: State = {
  features: [new MoveCanvasFeature(), DrawFeature.rect()],
}
