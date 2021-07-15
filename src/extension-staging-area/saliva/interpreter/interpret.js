// @flow
import interpreter from './interpreter';
import ascendToRoot from '../../../syntree-utils/ascend-to-root';

import type { StateSelector } from '../../../types/state-selector';
import type { InterpretationResolution } from '../types/interpreter/interpretation-resolution';
import type { EditorState } from '../../../types/editor-state';

export default (editorState: EditorState, state: StateSelector): InterpretationResolution => {
  let resolution: InterpretationResolution;
  try {
    const rootOfFocused = ascendToRoot(editorState.focus.synoId, state);
    resolution = interpreter(rootOfFocused, [], state);
  } catch (error) {
    throw new Error(`unexpected error during interpretation: "${error.message}"`);
  }

  if (resolution.success) {
    return resolution;
  }
  throw new Error(`interpretation failed: "${resolution.error.message}"`);
};
