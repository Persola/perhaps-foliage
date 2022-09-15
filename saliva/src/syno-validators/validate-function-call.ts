import StateSelector from 'perhaps-foliage/dist/main-process/selectors/state-selector';

import type Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/readable/syno';

import FunctionCall from '../synos/function-call';
import argumentParameterMismatch from '../utils/argument-parameter-mismatch';

export default (
  funkshunCallAsSyno: Syno,
  state: StateSelector,
): boolean => {
  const functionCall = new FunctionCall(funkshunCallAsSyno.id, funkshunCallAsSyno.tree);
  const callee = functionCall.callee();

  if (callee === null) {
    return false;
  }

  if (
    argumentParameterMismatch(
      functionCall,
      callee,
    )
  ) {
    return false;
  }

  return true;
};
