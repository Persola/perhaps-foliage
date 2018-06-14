// @flow
import type { presentationGraph } from './presentation-graph'

export type functionCallPres = {
  klass: 'functionCall',
  name: string,
  argumentz: {[slotName: string]: presentationGraph},
  resolved: boolean,
  focusNode: boolean
}
