// @flow
import interpreter from './interpreter.js';
import createSynoFetcher from '../../../syntree-utils/create-syno-fetcher.js';
import ascendToRoot from '../../../syntree-utils/ascend-to-root.js';
import type { InterpretationResolution } from '../types/interpreter/interpretation-resolution';
import type { EditorState } from '../../../types/editor-state';

export default (editorState: EditorState): InterpretationResolution => {
  let resolution: InterpretationResolution;
  try {
    const getSyno = createSynoFetcher(editorState.synoMap);
    const rootOfFocused = ascendToRoot(editorState.focus.synoId, getSyno);
    resolution = interpreter(rootOfFocused, [], getSyno);
  } catch (error) {
    throw new Error(`unexpected error during interpretation: "${error.message}"`);
  }

  if (resolution.success) {
    return resolution;
  }
  throw new Error(`interpretation failed: "${resolution.error.message}"`);
};
