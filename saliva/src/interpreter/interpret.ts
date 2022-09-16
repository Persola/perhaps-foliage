import StateSelector from 'perhaps-foliage/dist/main-process/state-interface/state-selector';

import type { EditorState } from 'perhaps-foliage/dist/types/editor-state/editor-state';
import type { InterpretationResolution } from 'perhaps-foliage/dist/types/interpreter/interpretation-resolution';

import reinstantiateAsSalivaType from '../synos/reinstantiate-as-saliva-type';
import interpreter from './interpreter';

export default (
  editorState: EditorState,
  state: StateSelector,
): InterpretationResolution => {
  let resolution: InterpretationResolution;

  try {
    resolution = interpreter(
      reinstantiateAsSalivaType(
        state.editeeTree().root(),
      ),
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
