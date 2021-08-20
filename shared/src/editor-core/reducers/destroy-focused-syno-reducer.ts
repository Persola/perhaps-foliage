import navOut from './navigate/nav-out';
import destroySyno from './destroy-focused-syno/destroy-syno';

import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { DestroyFocusedSyno } from '../../types/actions/destroy-focused-syno';
import type { StateSelector } from '../../types/state-selector';
import type { MutableFocus } from '../../types/editor-state/mutable/mutable-focus';
import type { UnistlikeEdit } from '../../types/unistlike/unistlike-edit';

export default (
  state: StateSelector,
  action: DestroyFocusedSyno,
  draftState: MutableEditorState,
  latestEdit: UnistlikeEdit[],
): void => {
  if (state.integrationLoaded() === false) {
    console.warn('Ignoring DESTROY_FOCUSED_SYNO action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    console.warn('Ignoring DESTROY_FOCUSED_SYNO action: no tree loaded');
    return;
  }

  if (state.inPresno()) {
    throw new TypeError(
      'DESTROY_FOCUSED_SYNO action received while not focused on syno level',
    );
  }

  if (state.focusedSynoIsRoot()) {
    console.warn("Ignoring syno destruction: can't destroy root syno");
    return;
  }

  if (state.isPrimitive(state.focusedSynoId())) {
    console.warn(
      "Ignoring syno destruction: can't destroy primitive or children",
    );
    return;
  }

  const focus: MutableFocus = draftState.focus;
  destroySyno(state, action, draftState, latestEdit);
  navOut(state, focus);
};
