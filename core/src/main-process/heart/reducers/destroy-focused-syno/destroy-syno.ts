import deleteReferencesFrom from './delete-references-from';
import deleteReferencesTo from './delete-references-to';

import type { StateSelector } from '../../../../types/state-selector';
import type { DestroyFocusedSyno } from '../../../../types/actions/destroy-focused-syno';
import type { MutableEditorState } from '../../../../types/mutable-editor-state';
import type { UnistlikeEdit } from '../../../../types/unistlike/unistlike-edit';
import type { Warn } from '../../../../types/cross-context/warn';

export default (
  state: StateSelector,
  action: DestroyFocusedSyno,
  draftState: MutableEditorState,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): void => {
  const { focusedPresnoId } = action;

  if (state.treeLoaded() === false) {
    warnUser('Ignoring attempted syno deletion: no code loaded');
    return;
  }

  if (state.focusedSynoIsRoot()) {
    warnUser('Ignoring attempted deletion of root syno');
    return;
  }

  if (!(focusedPresnoId in draftState.synoMap)) {
    throw new TypeError('Focused syno is not in editee syno map!?');
  }

  latestEdit.push({
    undo: { type: 'CREATE_SYNO' },
    redo: { type: 'DELETE_SYNO' },
  });

  deleteReferencesFrom(state, draftState, focusedPresnoId);
  deleteReferencesTo(state, draftState, focusedPresnoId);
  delete draftState.synoMap[focusedPresnoId];
  // TODO: recursively delete orphaned descendants
};
