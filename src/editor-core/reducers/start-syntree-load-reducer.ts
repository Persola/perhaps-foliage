import type { MutableEditorState } from "../../types/mutable-editor-state";
import type { StateSelector } from "../../types/state-selector";
export default ((state: StateSelector, draftState: MutableEditorState): void => {
  if (state.integrationLoaded() === false) {
    console.warn('Ignoring START_SYNTREE_LOAD action: no integration loaded');
    return;
  }

  draftState.loadingSyntree = true;
});