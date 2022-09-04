import type { StateSelector } from '../../../types/state-selector';
import type { MutableEditorState } from '../../../types/editor-state/mutable/mutable-editor-state';

export default (
  state: StateSelector,
  draftState: MutableEditorState,
): void => {
  if (!state.inText()) {
    throw new Error('Received text navigation command while not editing text');
  }

  draftState.focus.charIndex = null;
};
