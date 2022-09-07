import navOut from './navigate/nav-out';

import type { MutableEditorState } from '../../../types/editor-state/mutable/mutable-editor-state';
import type { StateSelector } from '../../../types/state-selector';
import type { UnistlikeEdit } from '../../../types/unistlike/unistlike-edit';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
  latestEdit: UnistlikeEdit[],
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring DESTROY_FOCUSED_SYNO action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    warnUser('Ignoring DESTROY_FOCUSED_SYNO action: no tree loaded');
    return;
  }

  if (state.inNonSynPresno()) {
    throw new TypeError(
      'DESTROY_FOCUSED_SYNO action received while not focused on syno level',
    );
  }

  if (state.focusedSyno().isRoot()) {
    warnUser('Ignoring syno destruction: can\'t destroy root syno');
    return;
  }

  if (!state.focusedSyno().tree.is(state.editeeTree())) {
    warnUser('Ignoring syno destruction: can\'t destroy primitive or children');
    return;
  }

  latestEdit.push({
    undo: { type: 'CREATE_SYNO' },
    redo: { type: 'DELETE_SYNO' },
  });

  draftState.focusedSyno().destroy();
  navOut(state, draftState.focus, warnUser);
};
