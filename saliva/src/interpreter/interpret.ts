import StateSelector from 'perhaps-foliage/dist/main-process/selectors/state-selector';

import type { EditorState } from 'perhaps-foliage/dist/types/editor-state/editor-state';
import type { InterpretationResolution } from 'perhaps-foliage/dist/types/interpreter/interpretation-resolution';

import interpreter from './interpreter';

export default (
  editorState: EditorState,
  state: StateSelector,
): InterpretationResolution => {
  let resolution: InterpretationResolution;

  try {
    resolution = interpreter(
      state.editeeTree().root(),
      [],
      state,
    );
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
