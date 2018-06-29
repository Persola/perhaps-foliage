// @flow
import type { VariableRef } from '../../../types/syntactic-nodes/variable-ref.js'
import type { VariableRefPresAttrs } from '../../../types/presentations/presno-attrs/variable-ref-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'

export default (
  presnoMap: PresnoMap,
  variableRef: VariableRef,
  scope: {},
  getSyno: Function,
  focusNodeId: (string | false)
): VariableRefPresAttrs => {
  const referent = getSyno(variableRef.referent);

  return {
    syntype: 'variableRef',
    valueSyntype: 'booleanLiteral',
    name: referent.name,
    focused: (variableRef.id === focusNodeId)
  }
}
