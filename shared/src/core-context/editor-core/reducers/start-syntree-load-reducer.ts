import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { StateSelector } from '../../../types/state-selector';
import type { Warn } from '../../../types/cross-context/warn';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring START_SYNTREE_LOAD action: no integration loaded');
    return;
  }

  draftState.loadingSyntree = true;
};
