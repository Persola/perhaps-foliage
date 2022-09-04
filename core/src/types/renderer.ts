import type { Store } from 'redux';
import type { EditorPresentation } from './presenter/editor-presentation';
import type { LangInt } from './language-integration';

export type Renderer = {
 render(
  editorStateStore: Store,
  presentation: EditorPresentation,
  integration: LangInt,
  resultOutdated: boolean,
  interpreting: boolean
 ): void;
}
