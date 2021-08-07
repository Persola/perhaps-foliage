import type { Store } from 'redux';
import type { EditorPresentation } from './presenter/editor-presentation';
import type { LanguageIntegration } from './language-integration';

export interface Renderer {
 render(
  editorStateStore: Store,
  presentation: EditorPresentation,
  integration: LanguageIntegration,
  resultOutdated: boolean,
  interpreting: boolean
 ): void;
}
