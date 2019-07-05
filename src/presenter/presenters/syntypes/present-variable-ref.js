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
  let valid = true;
  let name: (string | false) = false;
  if (!variableRef.referent) {
    valid = false;
  } else {
    name = getSyno(variableRef.referent).name;    
  }

  return {
    syntype: 'variableRef',
    valueSyntype: 'booleanLiteral',
    name,
    focused: focus && (variableRef.id === focus.synoId) && (focus.presnoIndex === false),
    presnoFocused: focus && (variableRef.id === focus.synoId) && focus.presnoIndex,
    charFocused: focus && (variableRef.id === focus.synoId) && focus.charIndex,
    valid
  }
}
