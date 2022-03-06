import {
  Feature,
  DrawFeature,
  HoverFeature,
  SelectFeature,
  MoveCanvasFeature,
  ZoomCanvasFeature,
  MoveEntityFeature,
  ControlFeature,
} from 'src/core/feature'

export interface State {
  features: Feature[]
}

export const selectState: State = {
  features: [
    ...getDefaultFeatures(),
    new ControlFeature(),
    new MoveEntityFeature(),
    new HoverFeature(),
    new SelectFeature(),
  ],
}

export const drawState: State = {
  features: [...getDefaultFeatures(), DrawFeature.rect()],
}

function getDefaultFeatures() {
  return [new ZoomCanvasFeature(), new MoveCanvasFeature()]
}
