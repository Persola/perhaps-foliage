import type { EditorStateWithIntegration } from '../editor-state/editor-state-with-integration';
import type { StateSelector } from '../state-selector';
import type { InterpretationResolution } from '../interpreter/interpretation-resolution';

export type Interpret = (
  (
    editorState: EditorStateWithIntegration,
    stateSelector: StateSelector,
  ) => InterpretationResolution
);
