import type { ReduxStore } from './redux-store';
import type { EditorPresentation } from './presenter/editor-presentation';
import type { LanguageIntegration } from './language-integration';

export interface Renderer {
  render(
    editorStateStore: ReduxStore,
    presentation: EditorPresentation,
    integration: LanguageIntegration,
    resultOutdated: boolean,
    interpreting: boolean
  ): void;
}
