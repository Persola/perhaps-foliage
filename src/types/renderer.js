// @flow
import type { EditorPresentation } from './presenter/editor-presentation.js';
import type { GrammarName } from './editor-state/grammar-name.js';

export interface Renderer {
  render(
    presentation: EditorPresentation,
    grammarName: GrammarName,
    resultOutdated: boolean,
    interpreting: boolean,
  ): void
}
