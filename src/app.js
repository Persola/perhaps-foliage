// @flow
import 'core-js';
import { enableMapSet } from 'immer';

import createEditorStateStore from './editor-core/create-editor-state-store';
import Renderer from './renderer/renderer.jsx';
import createPresent from './presenter/create-present';
import createInputResolver from './input-resolver/create-input-resolver';
import bindInputs from './input-resolver/bind-inputs';

import salivaGrammar from './extension-staging-area/saliva/grammar.yml';
import salivaKeyToNewSynoAttrs from './extension-staging-area/saliva/input-resolver/key-to-new-syno-attrs';

import type { LanguageIntegration } from './types/language-integration';

require('./stylesheet.sass');
require('./extension-staging-area/saliva/stylesheet.sass');
require('./extension-staging-area/pantheon/stylesheet.sass');

enableMapSet();

const integration: LanguageIntegration = {
  grammar: salivaGrammar,
  keyToNewSynoAttrs: salivaKeyToNewSynoAttrs,
};

const { editorStateStore, stateSelector } = createEditorStateStore(integration);
const renderer = new Renderer(document);
const present = createPresent(stateSelector, editorStateStore, renderer);
const editorStateSubscription = () => {
  stateSelector.state = editorStateStore.getState();
  present();
};
editorStateStore.subscribe(editorStateSubscription);
const inputResolver = createInputResolver(editorStateStore, stateSelector, salivaKeyToNewSynoAttrs);

window.addEventListener('load', () => {
  bindInputs(editorStateStore, inputResolver, salivaKeyToNewSynoAttrs);
  editorStateSubscription();
});
