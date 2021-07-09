// @flow
import type { ReduxStore } from './redux-store.js';
import type { EditorPresentation } from './presenter/editor-presentation.js';
import type { GrammarName } from './editor-state/grammar-name.js';

export interface Renderer {
  render(
    editorStateStore: ReduxStore,
    presentation: EditorPresentation,
    grammarName: GrammarName,
    resultOutdated: boolean,
    interpreting: boolean,
  ): void
}
