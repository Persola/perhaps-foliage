// @flow
import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { SetFocusSyno } from '../../types/actions/set-focus-syno';
import type { StateSelector } from '../../types/state-selector';

export default (
  state: StateSelector,
  action: SetFocusSyno,
  draftState: MutableEditorState,
): void => {
  if (state.synoMap[action.synoId] === undefined) {
    console.warn('Ignoring focus syno command: target syno not in input tree');
    return;
  }

  draftState.focus = {
    synoId: action.synoId,
    presnoIndex: false,
    charIndex: false,
  };
};
