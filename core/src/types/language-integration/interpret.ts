import StateSelector from '../../main-process/state-interface/state-selector';

import { EditorState } from '../editor-state/editor-state';
import type { InterpretationResolution } from '../interpreter/interpretation-resolution';

export type Interpret = (
  (
    editorState: EditorState,
    stateSelector: StateSelector,
  ) => InterpretationResolution
);
