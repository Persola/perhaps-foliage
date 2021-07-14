// @flow
import type { MutableEditorState } from '../../types/mutable-editor-state.js';
import type { StateSelector } from '../../types/state-selector';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
): void => {
  draftState.loadingSyntree = true;
};
