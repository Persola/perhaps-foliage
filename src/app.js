// @flow
import Mousetrap from 'mousetrap';
import Presenter from './presenter/presenter.js';
import Renderer from './renderer/renderer.jsx';
import editorStateStore from './editor-core/editor-state-store.js';
import createInterpretForStore from './interpreter/create-interpret-for-store.js'
import createInputResolver from './input-resolver/create-input-resolver.js'
import createFocusSyno from './create-focus-syno.js'
import type { SideEffectFunction } from './types/side-effect-function'

// $FlowFixMe
require('./stylesheet.sass');

const interpret: SideEffectFunction = createInterpretForStore(editorStateStore);
const renderer = new Renderer(document, interpret);
const presenter = new Presenter(editorStateStore, renderer);
const inputResolver = createInputResolver(editorStateStore, interpret);

const initializeMousetrap = () => {
  [
    '0',
    '1',
    't',
    'f',
    'enter',
    'left',
    'right',
    'up',
    'down',
    'backspace'
  ].forEach(key => {
    Mousetrap.bind(key, () => {
      inputResolver(key);
    });
  });

  if (document.documentElement === null) { throw new Error('document missing') }
  document.documentElement.click(); // bindings don't work before this (focus?)
  document.addEventListener('click', createFocusSyno(editorStateStore));
};

window.addEventListener('load', () => {
  initializeMousetrap();
  presenter.present();
});
