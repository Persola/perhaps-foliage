import StateSelector from 'perhaps-foliage/dist/main-process/selectors/state-selector';

import argumentParameterMismatch from '../utils/argument-parameter-mismatch';

import type FunctionCall from '../synos/function-call';

export default (
  funkshunCall: FunctionCall,
  state: StateSelector,
): boolean => {
  const callee = funkshunCall.callee();

  if (callee === null) {
    return false;
  }

  if (
    argumentParameterMismatch(
      funkshunCall,
      callee,
    )
  ) {
    return false;
  }

  return true;
};
