import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';

import type { VariableRef } from '../types/synos/variable-ref';
import type { VariableRefPresAttrs } from '../types/presentations/presno-attrs/variable-ref-attrs';
import type { FunctionParameter } from '../types/synos/function-parameter';

export default (
  variableRef: VariableRef,
  state: StateSelector,
): VariableRefPresAttrs => {
  let name: (null | string) = null;

  if (variableRef.referent) {
    const referent = state.getSyno(variableRef.referent.id);
    if (referent.syntype !== 'functionParameter') {
      throw new Error('Variable refs can only refer to parameters');
    }
    name = (referent as FunctionParameter).name;
  }

  return {
    attrs: {
      syntype: 'variableRef',
      valueSyntype: 'booleanLiteral',
      name,
    },
    childPresnoArgs: {},
  };
};
