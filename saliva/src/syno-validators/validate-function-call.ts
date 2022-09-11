import StateSelector from 'perhaps-foliage/dist/main-process/selectors/state-selector';
import { Argument } from '../types/synos/argument';

import type { FunctionCall } from '../types/synos/function-call';
import type { FunctionDefinition } from '../types/synos/function-definition';

import argumentParameterMismatch from '../utils/argument-parameter-mismatch';

export default (
  funkshunCall: FunctionCall,
  state: StateSelector,
): boolean => {
  let callee: FunctionDefinition;
  if (funkshunCall.children({ label: 'callee' }).length === 1) {
    callee = funkshunCall.children({ label: 'callee' })[0] as unknown as FunctionDefinition;
  } else if (funkshunCall.hasRef('callee') === false) {
    return false;
  } else if (funkshunCall.hasRef('callee') === 'intratree') {
    callee = funkshunCall.followIntratreeRef('callee') as unknown as FunctionDefinition;
  } else if (funkshunCall.hasRef('callee') === 'intertree') {
    callee = state.getSynoByUri(funkshunCall.intertreeRefs.callee) as FunctionDefinition;
  } else {
    throw new Error('hasRef interface changed');
  }

  if (
    argumentParameterMismatch(
      callee,
      funkshunCall.children({ label: 'argument' }) as unknown[] as Argument[],
      state,
    )
  ) {
    return false;
  }

  return true;
};
