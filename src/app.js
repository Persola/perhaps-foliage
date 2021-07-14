// @flow
import 'core-js';
import Mousetrap from 'mousetrap';
import { enableMapSet } from 'immer';

import createPresent from './presenter/create-present.js';
import Renderer from './renderer/renderer.jsx';
import createEditorStateStore from './editor-core/create-editor-state-store.js';
import createInputResolver from './input-resolver/create-input-resolver.js';
import createFocusSyno from './create-focus-syno.js';
import salivaKeyToNewSynoAttrs from './extension-staging-area/saliva/input-resolver/key-to-new-syno-attrs.js';

require('./stylesheet.sass');
require('./extension-staging-area/saliva/stylesheet.sass');
require('./extension-staging-area/pantheon/stylesheet.sass');

enableMapSet();

const { editorStateStore, stateSelector } = createEditorStateStore();
const renderer = new Renderer(document);
const present = createPresent(stateSelector, editorStateStore, renderer);
const editorStateSubscription = () => {
  stateSelector.state = editorStateStore.getState();
  present();
};
editorStateStore.subscribe(editorStateSubscription);
const inputResolver = createInputResolver(editorStateStore, stateSelector);

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
  editorStateSubscription();
});
