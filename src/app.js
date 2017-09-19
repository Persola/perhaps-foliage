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
  [0, 1].forEach(binumber => {
    Mousetrap.bind(String(binumber), () => {
      editorStateStore.dispatch({ type: 'UPDATE', value: binumber });
    });
  });
};

window.addEventListener('load', () => { entry(); });
