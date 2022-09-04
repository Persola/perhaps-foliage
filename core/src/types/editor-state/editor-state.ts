import type { EditorStateWithIntegration } from './editor-state-with-integration';
import type { EditorStateWithoutIntegration } from './editor-state-without-integration';

export type EditorState = (EditorStateWithIntegration | EditorStateWithoutIntegration);
