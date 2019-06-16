// @flow
import type { VariableRef } from '../../../types/syntactic-nodes/variable-ref.js'
import type { VariableRefPresAttrs } from '../../../types/presentations/presno-attrs/variable-ref-attrs.js'
import type { PresnoMap } from '../../../types/presentations/presno-map.js'
import type { Focus } from '../../../types/editor-state/focus.js'

export default (
  presnoMap: PresnoMap,
  variableRef: VariableRef,
  scope: {},
  getSyno: Function,
  focus: (Focus | false)
): VariableRefPresAttrs => {
  const referent = getSyno(variableRef.referent);

  return {
    syntype: 'variableRef',
    valueSyntype: 'booleanLiteral',
    name: referent.name,
    focused: focus && (variableRef.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (variableRef.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (variableRef.id === focus.synoId) && focus.charIndex
  }
}
