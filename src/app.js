// @flow
import Mousetrap from 'mousetrap';

import presenter from './presenter/presenter.js';
import renderer from './renderer/renderer.jsx';
import editorStateStore from './editor-state-store.js';
import presentationStore from './presentation-store.js';
import validEditorState from './valid-editor-state.js';

require('./stylesheet.css');

new presenter(editorStateStore, presentationStore, validEditorState);

const entry = () => {
  if (document.readyState !== 'complete') {
    throw (new Error('readyState error'));
  }

  renderer.render(presentationStore, document);
  editorStateStore.dispatch({ type: 'INITIALIZE' });
  [0, 1].forEach(binumber => {
    Mousetrap.bind(String(binumber), () => {
      editorStateStore.dispatch({ type: 'UPDATE', value: binumber });
    });
  });
};

window.addEventListener('load', () => { entry(); });
