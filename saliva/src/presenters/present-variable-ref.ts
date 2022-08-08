import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { EnstackForPresentation } from 'perhaps-foliage/dist/types/presenter/enstack-for-presentation';
import type { PresnoRef } from 'perhaps-foliage/dist/types/presenter/presno-ref';

import type { VariableRef } from '../types/synos/variable-ref';
import type { VariableRefPresAttrs } from '../types/presentations/presno-attrs/variable-ref-attrs';
import type { FunctionParameter } from '../types/synos/function-parameter';

export default (
  variableRef: VariableRef,
  state: StateSelector,
  enstackForPresentation: EnstackForPresentation,
): VariableRefPresAttrs => {
  let name: (null | PresnoRef) = null;

  if (variableRef.referent) {
    const referent = state.getSyno(variableRef.referent.id);
    if (referent.syntype !== 'functionParameter') {
      throw new Error('Variable refs can only refer to parameters');
    }
    name = enstackForPresentation(
      {
        valid: true,
        presnoIndex: 0,
        prestype: 'namePart',
        text: (referent as FunctionParameter).name,
      },
      variableRef,
    );
  }

  return {
    syntype: 'variableRef',
    name,
    valueSyntype: 'booleanLiteral',
  };
};
