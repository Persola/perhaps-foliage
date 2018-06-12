// @flow
import type { presentationGraph } from './presentation-graph'

export type functionCallPres = {
  klass: 'functionCall',
  name: string,
  argumentz: presentationGraph[]
}
