import interpreter from "./interpreter";
import ascendToRoot from "../utils/ascend-to-root";
import type { StateSelector } from "../../../types/state-selector";
import type { EditorStateWithIntegration } from "../../../types/editor-state/editor-state-with-integration";
import type { InterpretationResolution } from "../../../types/interpreter/interpretation-resolution";
export default ((editorState: EditorStateWithIntegration, state: StateSelector): InterpretationResolution => {
  let resolution: InterpretationResolution;

  try {
    const rootOfFocused = ascendToRoot(editorState.focus.synoId, state.synoMap());
    resolution = interpreter(rootOfFocused, [], state);
  } catch (error) {
    throw new Error(`unexpected error during interpretation: "${error.message}"`);
  }

  if (resolution.success === true) {
    return resolution;
  }

  throw new Error(`interpretation failed: "${resolution.error.message}"`);
});