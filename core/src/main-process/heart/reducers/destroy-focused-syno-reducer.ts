import navOut from './navigate/nav-out';
import destroySyno from '../../syntactic-interface/exposed/destroy-syno';

import type { MutableEditorState } from '../../../types/editor-state/mutable/mutable-editor-state';
import type { StateSelector } from '../../../types/state-selector';
import type { MutableFocus } from '../../../types/editor-state/mutable/mutable-focus';
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

  if (state.focusedSynoIsRoot()) {
    warnUser('Ignoring syno destruction: can\'t destroy root syno');
    return;
  }

  if (state.isPrimitive(state.focusedSynoId())) {
    warnUser('Ignoring syno destruction: can\'t destroy primitive or children');
    return;
  }

  latestEdit.push({
    undo: { type: 'CREATE_SYNO' },
    redo: { type: 'DELETE_SYNO' },
  });

  const focusedPresnoId = state.focusedSynoId();
  const focus: MutableFocus = draftState.focus;
  destroySyno(focusedPresnoId, state, draftState);
  // here we need to know whether a required child gap will be presented
  // so we can remain focused on it
  navOut(state, focus, warnUser);
};
