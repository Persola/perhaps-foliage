// @flow
import type { SynoRef } from '../../syno-ref'
import type { Argumentz } from '../argumentz'

export type FunctionCallPresAttrs = {
  syntype: 'functionCall',
  name: string,
  argumentz: Argumentz,
  bodyRef: (SynoRef | false),
  resolved: boolean,
  focused: boolean
}
