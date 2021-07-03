// @flow
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map.js';
import type { Focus } from '../../../types/editor-state/focus.js';
import type { GrammarName } from '../../../types/editor-state/grammar-name.js';
import type { VariableRef } from '../types/synos/variable-ref.js';
import type { VariableRefPresAttrs } from '../types/presentations/presno-attrs/variable-ref-attrs.js';

export default (
  grammar: GrammarName,
  presnoMap: MutablePresnoMap,
  variableRef: VariableRef,
  scope: {},
  getSyno: Function,
  focus: (Focus | false),
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
    valid,
  };
};
