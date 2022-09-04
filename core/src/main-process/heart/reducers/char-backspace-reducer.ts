import synoMapReducer from './char-backspace/syno-map';

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
    warnUser('Ignoring CHAR_BACKSPACE action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    warnUser('Ignoring CHAR_BACKSPACE action: no tree loaded');
    return;
  }

  if (!state.inText()) {
    warnUser('Ignoring CHAR_BACKSPACE action: not focused on text');
    return;
  }

  if (state.focusedCharIndex() === 0) {
    warnUser('Ignoring backspace: at beginning of text');
    return;
  }

  draftState.focus.charIndex -= 1;
  synoMapReducer(
    state,
    draftState.synoMap,
    latestEdit,
  );
};
