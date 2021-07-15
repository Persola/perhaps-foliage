// @flow
import type { ReduxStore } from './redux-store';
import type { EditorPresentation } from './presenter/editor-presentation';
import type { GrammarName } from './editor-state/grammar-name';

export interface Renderer {
  render(
    editorStateStore: ReduxStore,
    presentation: EditorPresentation,
    grammarName: GrammarName,
    resultOutdated: boolean,
    interpreting: boolean,
  ): void
}
