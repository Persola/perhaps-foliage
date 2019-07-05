// @flow
import type { SynoRef } from '../../syno-ref'

export type VariableRefAttrs = {
  syntype: 'variableRef',
  valueSyntype: 'booleanLiteral',
  referent: (SynoRef | false)
}
