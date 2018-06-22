// @flow
import type { Argumentz } from './argumentz'
import type { SynoId } from '../syno-id'

export type FunctionCallPres = {
  syntype: 'functionCall',
  synoId: SynoId,
  name: string,
  argumentz: Argumentz,
  resolved: boolean,
  focused: boolean
}
