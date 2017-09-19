// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Editor } from './components/editor.jsx';
import type { presentation } from '../types/presentation' // eslint-disable-line no-unused-vars

type element = Object;
type document = any;

export default class {
  editorEl: element

  constructor(document: document) {
    this.editorEl = document.getElementById('editor');
  }

  render(presentation: presentation) {
    ReactDOM.render(
      (
        <Editor presentation={presentation} />
      ),
      this.editorEl
    );
  }
}
