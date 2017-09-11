// @flow
import { createStore } from 'redux';
import Mousetrap from 'mousetrap';
import presenter from './presenter/presenter.js'
import renderer from './renderer/renderer.jsx'
import editorStateStore from './editor-state-store.js'
import validEditorState from './valid-editor-state.js';

require('./stylesheet.css');



const defaultPresentation = { stageful: false }

const presentationStateReducer = (oldPresentation = defaultPresentation, action) => {
  const { type, presentation } = action

  if (type !== 'RENDER') {
    if (type === '@@redux/INIT') {
      return oldPresentation
    } else {
      throw new Error('Invalid presentation reducer action type')
    }
  }

  const validPresentation = candidatePresentation => {
    if (!Object.keys(candidatePresentation) === ['stageful']) {
      return false;
    }

    const { stageful } = candidatePresentation;

    if (!Object.keys(stageful) === ['klass', 'data']) {
      return false;
    }

    if (!stageful.klass === 'numberLiteral') {
      return false;
    }

    if (![0, 1].includes(stageful.data)) {
      return false;
    }

    return true;
  };

  if (!validPresentation(presentation)) {
    throw new Error('Only the omnivalue can be rendered');
  }

  return presentation;
}

const presentationStore = createStore(presentationStateReducer);

new presenter(editorStateStore, presentationStore, validEditorState);
renderer.render(presentationStore, document);

const entry = () => {
  if (document.readyState !== 'complete') { throw (new Error('readyState error')); }
  editorStateStore.dispatch({ type: 'INITIALIZE' })
  Mousetrap.bind('0', () => {
    editorStateStore.dispatch({ type: 'UPDATE', value: 0 });
  });
  Mousetrap.bind('1', () => {
    editorStateStore.dispatch({ type: 'UPDATE', value: 1 });
  });
};

window.addEventListener('load', () => { entry(); });
