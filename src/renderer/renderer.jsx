// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/editor.jsx';

import type { ReduxStore } from '../types/redux-store';
import type { EditorPresentation } from '../types/presenter/editor-presentation.js';
import type { GrammarName } from '../types/editor-state/grammar-name.js';

type Element = Object;

export default class {
  editorEl: Element

  constructor(document: Document) {
    this.editorEl = document.getElementById('editor');
  }

  render(
    editorStateStore: ReduxStore,
    presentation: EditorPresentation,
    grammarName: GrammarName,
    resultOutdated: boolean,
    interpreting: boolean,
  ) {
    ReactDOM.render(
      (
        <Editor
          editorStateStore={editorStateStore}
          grammarName={grammarName}
          presentation={presentation}
          resultOutdated={resultOutdated}
          interpreting={interpreting}
        />
      ),
      this.editorEl,
    );
  }
}
