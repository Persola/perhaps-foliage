// @flow
import synoMapReducer from './char-backspace/syno-map';

import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { StateSelector } from '../../types/state-selector';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
): void => {
  if (!state.inText()) {
    throw new TypeError('CHAR_BACKSPACE action recieved while not focused on text syno');
  }

  synoMapReducer(
    state,
    draftState.synoMap,
  );

  if (state.focusedCharIndex() === 0) {
    console.warn('Ignoring backspace: at beginning of text');
  } else {
    // $FlowFixMe: Flow doesn't look into selector interface
    draftState.focus.charIndex -= 1;
  }
};
