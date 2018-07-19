// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/editor.jsx';
import type { EditorPresentation } from '../types/presentations/editor-presentation.js'

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
    resultOutdated: boolean,
    interpreting: boolean
  ) {
    ReactDOM.render(
      (
        <Editor
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
