// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { Focus } from '../../../types/editor-state/focus';
import type { GrammarName } from '../../../types/editor-state/grammar-name';
import type { VariableRef } from '../types/synos/variable-ref';
import type { VariableRefPresAttrs } from '../types/presentations/presno-attrs/variable-ref-attrs';

export default (
  state: StateSelector,
  grammar: GrammarName,
  presnoMap: MutablePresnoMap,
  variableRef: VariableRef,
  scope: {},
  focus: (Focus | false),
): VariableRefPresAttrs => {
  let valid = true;
  let name: (string | false) = false;
  if (!variableRef.referent) {
    valid = false;
  } else {
    const vr = state.getSyno(variableRef.referent.id);
    if (vr.syntype !== 'functionParameter') throw new Error();
    name = vr.name;
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
