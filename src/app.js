// @flow
import Mousetrap from 'mousetrap';
import Presenter from './presenter/presenter.js';
import Renderer from './renderer/renderer.jsx';
import editorStateStore from './editor-core/editor-state-store.js';
import createInputResolver from './input-resolver/create-input-resolver.js';
import createFocusSyno from './create-focus-syno.js';
import salivaKeyToNewSynoAttrs from './extension-staging-area/saliva/input-resolver/key-to-new-syno-attrs.js';

import type { SideEffectFunction } from './types/side-effect-function';

import createInterpretForStore from './extension-staging-area/saliva/interpreter/create-interpret-for-store.js';

require('./stylesheet.sass');
require('./extension-staging-area/saliva/stylesheet.sass');
require('./extension-staging-area/pantheon/stylesheet.sass');

const interpret: SideEffectFunction = createInterpretForStore(editorStateStore);
const renderer = new Renderer(document, interpret);
const presenter = new Presenter(editorStateStore, renderer);
const inputResolver = createInputResolver(editorStateStore, interpret);

const initializeMousetrap = () => {
  Mousetrap.bind([
    'enter',
    'left',
    'right',
    'up',
    'down',
    'backspace',
  ].concat(Object.keys(salivaKeyToNewSynoAttrs)), (e, key) => {
    if ([
      'backspace',
      'up',
      'down',
    ].includes(key)) {
      e.preventDefault();
    }
    inputResolver(key);
  });

  if (document.documentElement === null) { throw new Error('document missing'); }
  document.documentElement.click(); // bindings don't work before this (focus?)
  document.addEventListener('click', createFocusSyno(editorStateStore));
};

window.addEventListener('load', () => {
  initializeMousetrap();
  presenter.present();
});
