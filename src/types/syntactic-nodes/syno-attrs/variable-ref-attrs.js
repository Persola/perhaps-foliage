// @flow
import type { SynoRef } from '../../syno-ref'

export type VariableRefAttrs = {
  syntype: 'variableRef',
  valueSyntype: 'booleanLiteral',
  referent: SynoRef // ! SynoRef is not itself the referant of the VariableRef because it's not in the syntree; it's another level of reference down !
}
