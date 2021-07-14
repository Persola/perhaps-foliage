// @flow
import type { MutableEditorState } from '../../types/mutable-editor-state.js';
import type { StateSelector } from '../../types/state-selector';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
): void => {
  if (state.interpreting()) {
    throw new Error('attempted to interpret while already interpreting');
  }

  draftState.interpreting = true;
};
