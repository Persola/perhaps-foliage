import synoMapReducer from './char-backspace/syno-map';

import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { StateSelector } from '../../types/state-selector';
import type { UnistlikeEdit } from '../../types/unistlike/unistlike-edit';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
  latestEdit: UnistlikeEdit[],
): void => {
  if (state.integrationLoaded() === false) {
    console.warn('Ignoring CHAR_BACKSPACE action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    console.warn('Ignoring CHAR_BACKSPACE action: no tree loaded');
    return;
  }

  if (!state.inText()) {
    console.warn('Ignoring CHAR_BACKSPACE action: not focused on text');
    return;
  }

  if (state.focusedCharIndex() === 0) {
    console.warn('Ignoring backspace: at beginning of text');
    return;
  }

  draftState.focus.charIndex -= 1;
  synoMapReducer(
    state,
    draftState.synoMap,
    latestEdit,
  );
};
