// @flow
import type { Syntype } from '../../syntype.js'

export type FunctionParameterPresAttrs = {
  syntype: 'functionParameter',
  slot: string,
  valueSyntype: Syntype,
  focused: boolean
}
