// @flow
import type { argumentz } from './argumentz'

export type functionCallPres = {
  klass: 'functionCall',
  name: string,
  argumentz: argumentz,
  resolved: boolean,
  focused: boolean
}
