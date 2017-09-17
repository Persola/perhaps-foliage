// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/editor.jsx';
import validPresentation from '../valid-presentation.js';

export default class {
  constructor(document) {
    this.editorEl = document.getElementById('editor');
  }

  render(presentation) {
    if(!validPresentation(presentation)) {
      throw new Error('Invalid presentation')
    }

    ReactDOM.render(
      (
        <Editor presentation={presentation} />
      ),
      this.editorEl
    );
  }
}
