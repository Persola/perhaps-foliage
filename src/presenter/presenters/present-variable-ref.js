// @flow
import type { VariableRef } from '../../types/syntactic-nodes/variable-ref.js'
import type { VariableRefPres } from '../../types/presentations/variable-ref.js'

export default (
  variableRef: VariableRef,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): VariableRefPres => {
  return {
    synoId: variableRef.id,
    syntype: 'variableRef',
    valueKlass: 'booleanLiteral',
    name: variableRef.name,
    focused: (variableRef.id === focusNodeId)
  }
}
