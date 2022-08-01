import dup from '../../../syntree-utils/dup';

import type { StateSelector } from '../../../types/state-selector';
import type { EndInterpretation } from '../../../types/actions/end-interpretation';
import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { MutableSyno } from '../../../types/syntactic/mutables/mutable-syno';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  state: StateSelector,
  action: EndInterpretation,
  draftState: MutableEditorState,
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring END_INTERPRETATION action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    warnUser('Ignoring END_INTERPRETATION action: no tree loaded');
    return;
  }

  if (!state.interpreting()) {
    throw new Error('Attempted to stop interpreting while not interpreting');
  }

  const result: MutableSyno = dup(action.result);
  Object.assign(draftState, {
    resultTree: {
      [result.id]: result,
    },
    resultSyntreeRootId: action.result.id,
    interpreting: false,
    resultOutdated: false,
  });
};
