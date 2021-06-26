// @flow
import type { Syntype } from '../../synos/syntype.js'

export type FunctionParameterPresAttrs = {
  syntype: 'functionParameter',
  focused: boolean,
  presnoFocused: (number | false),
  charFocused: (number | false),
  slot: string,
  valueSyntype: Syntype
}
