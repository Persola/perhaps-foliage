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
import salivaInterpret from './extension-staging-area/saliva/interpreter/interpret';
import salivaPresenters from './extension-staging-area/saliva/presenters/presenters';
import salivaRenderers from './extension-staging-area/saliva/renderers/renderers';

import editorStyles from './editor-styles.css'; // eslint-disable-line no-unused-vars

// import pantheonGrammar from './extension-staging-area/pantheon/grammar.yml';
// import pantheonKeyToNewSynoAttrs from
// './extension-staging-area/pantheon/input-resolver/key-to-new-syno-attrs';
// import pantheonPresenters from './extension-staging-area/pantheon/presenters/presenters';
// import pantheonRenderers from './extension-staging-area/pantheon/renderers/renderers';

import salivaStyles from './extension-staging-area/saliva/stylesheet.lazy.css';
// import pantheonStyles from './extension-staging-area/pantheon/stylesheet.lazy.css';

import type { LanguageIntegration } from './types/language-integration';

enableMapSet();

/*
  The integration is a mutable object storing unserializable 3rd party scripts and therefore has
 state independant of the editor state. But it should be in sync with language loads (not yet
 implemented).
*/
const integration: LanguageIntegration = {
  grammar: salivaGrammar,
  keyToNewSynoAttrs: salivaKeyToNewSynoAttrs,
  interpret: salivaInterpret,
  presenters: salivaPresenters,
  renderers: salivaRenderers,
  styles: salivaStyles,
};

integration.styles.use();

const { editorStateStore, stateSelector } = createEditorStateStore(integration);
const renderer = new Renderer(document);
const present = createPresent(
  stateSelector,
  editorStateStore,
  renderer,
  integration,
);
const editorStateSubscription = () => {
  stateSelector.state = editorStateStore.getState();
  present();
};
editorStateStore.subscribe(editorStateSubscription);
const inputResolver = createInputResolver(
  editorStateStore,
  stateSelector,
  salivaKeyToNewSynoAttrs,
);

window.addEventListener('load', () => {
  bindInputs(editorStateStore, inputResolver, salivaKeyToNewSynoAttrs);
  editorStateSubscription();
});
