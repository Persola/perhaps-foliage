// @flow
import dup from '../../syntree-utils/dup.js';

import type { StateSelector } from '../../types/state-selector';
import type { EndInterpretation } from '../../types/actions/end-interpretation';
import type { MutableEditorState } from '../../types/mutable-editor-state.js';
import type { MutableSyno } from '../../types/mutable-syno';

export default (
  state: StateSelector,
  action: EndInterpretation,
  draftState: MutableEditorState,
): void => {
  if (!state.interpreting()) {
    throw new Error('attempted to stop interpreting while not interpreting');
  }

  const result: MutableSyno = dup(action.result);
  draftState.synoMap[result.id] = result;

  draftState.resultSyntreeRootId = action.result.id;
  draftState.interpreting = false;
  draftState.resultOutdated = false;
};
