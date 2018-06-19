// @flow
import type { argumentz } from './argumentz'

export type functionCallPres = {
  syntype: 'functionCall',
  name: string,
  argumentz: argumentz,
  resolved: boolean,
  focused: boolean
}
