import Syno from 'perhaps-foliage/dist/main-process/syntactic-interface/newnew/syno';
import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';

import argumentParameterMismatch from '../utils/argument-parameter-mismatch';

export default (
  funkshunCall: Syno,
  state: StateSelector,
): boolean => {
  let callee: Syno;
  if (funkshunCall.children({ label: 'callee' }).length === 1) {
    callee = funkshunCall.children({ label: 'callee' })[0];
  } else if (funkshunCall.children({ label: 'callee' }).length !== 0) {
    return false;
  } else if (funkshunCall.hasRef('callee') === false) {
    return false;
  } else if (funkshunCall.hasRef('callee') === 'intratree') {
    callee = funkshunCall.followIntratreeRef('callee');
  } else if (funkshunCall.hasRef('callee') === 'intertree') {
    callee = state.getSynoByUri(funkshunCall.intertreeRefs.callee);
  } else {
    throw new Error('hasRef interface changed');
  }

  if (
    argumentParameterMismatch(
      callee,
      funkshunCall.children({ label: 'argument' }),
      state,
    )
  ) {
    return false;
  }

  return true;
};
