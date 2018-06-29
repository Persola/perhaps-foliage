// @flow
import type { SynoRef } from '../../syno-ref'

export type VariableRefAttrs = {
  syntype: 'variableRef',
  valueSyntype: 'booleanLiteral',
  referent: SynoRef // ! this is not a child in the syntree, just a ref !
}
