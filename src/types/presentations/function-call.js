// @flow
import type { argumentz } from './argumentz'
import type { synoId } from '../syno-id'

export type functionCallPres = {
  syntype: 'functionCall',
  synoId: synoId,
  name: string,
  argumentz: argumentz,
  resolved: boolean,
  focused: boolean
}
