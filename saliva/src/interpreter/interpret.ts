import type { StateSelector } from 'perhaps-foliage/dist/types/state-selector';
import type { EditorStateWithIntegration } from 'perhaps-foliage/dist/types/editor-state/editor-state-with-integration';
import type { InterpretationResolution } from 'perhaps-foliage/dist/types/interpreter/interpretation-resolution';

import interpreter from './interpreter';

const ascendToRoot = () => { throw new Error('unimplemented'); };

export default (
  editorState: EditorStateWithIntegration,
  state: StateSelector,
): InterpretationResolution => {
  let resolution: InterpretationResolution;

  try {
    const rootOfFocused = ascendToRoot(
      editorState.focus.synoId,
      state.synoMap(),
    );
    resolution = interpreter(rootOfFocused, [], state);
  } catch (error) {
    throw new Error(
      `unexpected error during interpretation: "${error.message}"`,
    );
  }

  if (resolution.success === true) {
    return resolution;
  }

  throw new Error(`interpretation failed: "${resolution.error.message}"`);
};
