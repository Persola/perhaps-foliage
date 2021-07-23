// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/editor.jsx';

import type { ReduxStore } from '../types/redux-store';
import type { EditorPresentation } from '../types/presenter/editor-presentation';
import type { LanguageIntegration } from '../types/language-integration';

type Element = Object;

export default class {
  editorEl: Element

  constructor(document: Document) {
    this.editorEl = document.getElementById('editor');
  }

  render(
    editorStateStore: ReduxStore,
    presentation: EditorPresentation,
    integration: LanguageIntegration,
    resultOutdated: boolean,
    interpreting: boolean,
  ) {
    ReactDOM.render(
      (
        <Editor
          editorStateStore={editorStateStore}
          integration={integration}
          presentation={presentation}
          resultOutdated={resultOutdated}
          interpreting={interpreting}
        />
      ),
      this.editorEl,
    );

    if (integration.styles) {
      integration.styles.use();
    }
  }
}