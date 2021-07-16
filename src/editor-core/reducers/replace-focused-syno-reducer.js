// @flow
import synoMapReducer from './replace-focused-syno/syno-map';

import type { StateSelector } from '../../types/state-selector';
import type { ReplaceFocusedSyno } from '../../types/actions/replace-focused-syno';
import type { MutableEditorState } from '../../types/mutable-editor-state';

export default (
  state: StateSelector,
  action: ReplaceFocusedSyno,
  draftState: MutableEditorState,
): void => {
  synoMapReducer(
    state,
    action,
    draftState.synoMap,
    draftState,
  );

  draftState.focus = {
    synoId: action.newSynoId,
    presnoIndex: false,
    charIndex: false,
  };

  draftState.resultOutdated = true;
};
