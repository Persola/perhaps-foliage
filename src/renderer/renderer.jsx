// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/editor.jsx';
import type { EditorPresentation } from '../types/presentations/editor-presentation.js' // eslint-disable-line no-unused-vars

type element = Object;
type document = any;

export default class {
  editorEl: element
  interpret: Function

  constructor(document: document, interpret: Function) {
    this.editorEl = document.getElementById('editor');
    this.interpret = interpret;
  }

  render(presentation: EditorPresentation, resultOutdated: boolean) {
    ReactDOM.render(
      (
        <Editor
          presentation={presentation}
          interpret={this.interpret}
          resultOutdated={resultOutdated}
        />
      ),
      this.editorEl
    );
  }
}
