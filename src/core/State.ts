import { Feature, SelectFeature, DrawFeature } from 'src/core/feature'


export interface State {
  features: Feature[]
}

export const selectState: State = {
  features: [
    new SelectFeature(),
  ]
}

export const drawState: State = {
  features: [
    new DrawFeature(),
  ]
}
