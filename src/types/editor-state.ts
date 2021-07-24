import type { EditorStateWithIntegration } from './editor-state/editor-state-with-integration';
import type { EditorStateWithoutIntegration } from './editor-state/editor-state-without-integration';

export type EditorState =
  | EditorStateWithIntegration
  | EditorStateWithoutIntegration;
