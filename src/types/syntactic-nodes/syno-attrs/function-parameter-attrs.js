// @flow
import type { Syntype } from '../../syntype.js'

export type FunctionParameterAttrs = {
  syntype: 'functionParameter',
  name: string,
  valueSyntype: Syntype
}
