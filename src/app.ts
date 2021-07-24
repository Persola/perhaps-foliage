import { enableMapSet } from "immer";
import createEditorStateStore from "./editor-core/create-editor-state-store";
import Renderer from "./renderer/renderer";
import createPresent from "./presenter/create-present";
import createInputResolver from "./input-resolver/create-input-resolver";
import bindEditorInputs from "./input-resolver/bind-editor-inputs";
import updateIntegrationInputBindings from "./input-resolver/update-integration-input-bindings";
import "./editor-styles.css"; // eslint-disable-line no-unused-vars

// import pantheonGrammar from './extension-staging-area/pantheon/grammar.yml';
// import pantheonKeyToNewSynoAttrs from
// './extension-staging-area/pantheon/input-resolver/key-to-new-syno-attrs.yml';
// import pantheonPresenters from './extension-staging-area/pantheon/presenters/presenters';
// import pantheonRenderers from './extension-staging-area/pantheon/renderers/renderers';
// import pantheonStyles from './extension-staging-area/pantheon/stylesheet.lazy.css';
import type { AbsentLanguageIntegration } from "./types/language-integration/absent-language-integration";
enableMapSet();

/*
  The integration is a mutable object storing unserializable 3rd party scripts and therefore has
 state independant of the editor state. But it should be in sync with language loads (not yet
 implemented).
*/
const integration: AbsentLanguageIntegration = {
  id: null,
  grammar: null,
  primitives: null,
  keyToNewSynoAttrs: null,
  interpret: null,
  presenters: null,
  renderers: null,
  styles: null,
};
const { editorStateStore, stateSelector } = createEditorStateStore(integration);
const renderer = new Renderer(document);
const present = createPresent(
  stateSelector,
  editorStateStore,
  renderer,
  integration
);
const inputResolver = createInputResolver(
  editorStateStore,
  stateSelector,
  integration
);

const editorStateSubscription = () => {
  stateSelector.state = editorStateStore.getState();
  present();
  updateIntegrationInputBindings(stateSelector, inputResolver);
};

editorStateStore.subscribe(editorStateSubscription);
window.addEventListener("load", () => {
  bindEditorInputs(editorStateStore, inputResolver);
  editorStateSubscription();
});
