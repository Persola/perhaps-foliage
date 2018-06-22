// @flow
import type { SynoId } from '../syno-id.js'

export type VariableRefPres = {
  synoId: SynoId,
  syntype: 'variableRef',
  valueSyntype: 'booleanLiteral',
  name: string,
  focused: boolean
}
