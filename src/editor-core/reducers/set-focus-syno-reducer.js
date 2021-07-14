// @flow
import type { MutableEditorState } from '../../types/mutable-editor-state.js';
import type { SetFocusSyno } from '../../types/actions/set-focus-syno';
import type { StateSelector } from '../../types/state-selector';

export default (
  state: StateSelector,
  action: SetFocusSyno,
  draftState: MutableEditorState,
): void => {
  draftState.focus = {
    synoId: action.synoId,
    presnoIndex: false,
    charIndex: false,
  };
};
