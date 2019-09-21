// @flow
import type { Syntype } from '../../synos/syntype.js'

export type FunctionParameterPresAttrs = {
  syntype: 'functionParameter',
  slot: string,
  valueSyntype: Syntype,
  focused: boolean
}
