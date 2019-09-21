// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/editor.jsx';

import type { EditorPresentation } from '../types/presenter/editor-presentation.js'
import type { GrammarName } from '../types/editor-state/grammar-name.js'

type element = Object;
type document = any;

export default class {
  editorEl: element
  interpret: Function

  constructor(document: document, interpret: Function) {
    this.editorEl = document.getElementById('editor');
    this.interpret = interpret;
  }

  render(
    presentation: EditorPresentation,
    grammarName: GrammarName,
    resultOutdated: boolean,
    interpreting: boolean
  ) {
    ReactDOM.render(
      (
        <Editor
          grammarName={grammarName}
          presentation={presentation}
          interpret={this.interpret}
          resultOutdated={resultOutdated}
          interpreting={interpreting}
        />
      ),
      this.editorEl
    );
  }
}
