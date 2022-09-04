import type { MutableEditorState } from '../../../types/editor-state/mutable/mutable-editor-state';
import type { SetFocusSyno } from '../../../types/actions/commands/set-focus-syno';
import type { StateSelector } from '../../../types/state-selector';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  state: StateSelector,
  action: SetFocusSyno,
  draftState: MutableEditorState,
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring SET_FOCUS_SYNO action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    warnUser('Ignoring SET_FOCUS_SYNO action: no tree loaded');
    return;
  }

  if (state.synoMap()[action.synoId] === undefined) {
    warnUser('Ignoring SET_FOCUS_SYNO action: target syno not in input tree');
    return;
  }

  draftState.focus = {
    synoId: action.synoId,
    presnoIndex: null,
    budIndex: null,
    charIndex: null,
  };
};
