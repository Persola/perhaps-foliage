import synoMapReducer from "./char-backspace/syno-map";
import type { MutableEditorState } from "../../types/mutable-editor-state";
import type { StateSelector } from "../../types/state-selector";
export default (state: StateSelector, draftState: MutableEditorState): void => {
  if (state.integrationLoaded() === false) {
    console.warn("Ignoring CHAR_BACKSPACE action: no integration loaded");
    return;
  }

  if (state.treeLoaded() === false) {
    console.warn("Ignoring CHAR_BACKSPACE action: no tree loaded");
    return;
  }

  if (!state.inText()) {
    console.warn("Ignoring CHAR_BACKSPACE action: not focused on text");
    return;
  }

  synoMapReducer(
    state, // $FlowFixMe: Flow doesn't look into selector interface
    draftState.synoMap
  );

  if (state.focusedCharIndex() === 0) {
    console.warn("Ignoring backspace: at beginning of text");
  } else {
    // $FlowFixMe: Flow doesn't look into selector interface
    draftState.focus.charIndex -= 1;
  }
};
