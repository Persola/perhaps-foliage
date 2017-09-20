// @flow
import Mousetrap from 'mousetrap';

import presenter from './presenter/presenter.js';
import Renderer from './renderer/renderer.jsx';
import editorStateStore from './editor-state-store.js';

require('./stylesheet.css');

const renderer = new Renderer(document);
new presenter(editorStateStore, renderer);

const entry = () => {
  editorStateStore.dispatch({ type: 'INITIALIZE' });
  [false, true].forEach(boolean => {
    Mousetrap.bind(String(Number(boolean)), () => {
      editorStateStore.dispatch({ type: 'UPDATE', value: boolean });
    });
  });
};

window.addEventListener('load', () => { entry(); });
