// @flow
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { SetFocusSyno } from '../../types/actions/set-focus-syno';
import type { StateSelector } from '../../types/state-selector';

export default (
  state: StateSelector,
  action: SetFocusSyno,
  draftState: MutableEditorState,
): void => {
  if (state.integrationLoaded() === false) {
    console.warn('Ignoring SET_FOCUS_SYNO action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    console.warn('Ignoring SET_FOCUS_SYNO action: no tree loaded');
    return;
  }

  if (state.synoMap()[action.synoId] === undefined) {
    console.warn('Ignoring SET_FOCUS_SYNO action: target syno not in input tree');
    return;
  }

  draftState.focus = {
    synoId: action.synoId,
    presnoIndex: null,
    charIndex: null,
  };
};
