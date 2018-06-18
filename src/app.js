// @flow
import Mousetrap from 'mousetrap';
import presenter from './presenter/presenter.js';
import Renderer from './renderer/renderer.jsx';
import editorStateStore from './editor-state-store/editor-state-store.js';
import createInterpretForStore from './interpreter/create-interpret-for-store.js'
import createInputResolver from './input-resolver/create-input-resolver.js'
import type { sideEffectFunction } from './types/side-effect-function'

// $FlowFixMe
require('./stylesheet.sass');

const interpret: sideEffectFunction = createInterpretForStore(editorStateStore);
const renderer = new Renderer(document, interpret);
new presenter(editorStateStore, renderer);
const inputResolver = createInputResolver(editorStateStore, interpret);

const initializeMousetrap = () => {
  ['0', '1', 't', 'f', 'enter', 'left', 'right', 'up', 'down'].forEach(key => {
    Mousetrap.bind(key, () => {
      inputResolver(key);
    });
  });

  document.documentElement.click(); // bindings don't work before this (focus?)
};

const entry = () => {
  editorStateStore.dispatch({ type: 'INITIALIZE' });
  initializeMousetrap();
};

window.addEventListener('load', () => { entry(); });
