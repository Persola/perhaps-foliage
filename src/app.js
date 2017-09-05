// @flow
import { createStore } from 'redux';
import codeLoader from './code-loader.js'
import presenter from './presenter.js'
import renderer from './renderer.jsx'

require('./stylesheet.css');

const syntacticGraphsIdentical = (firstGraph, secondGraph) => {
  return (
    JSON.stringify(firstGraph) === JSON.stringify(secondGraph)
  )
}

const entry = () => {
  if (document.readyState !== 'complete') { throw (new Error('readyState error')); }
  const defaultEdtiorState = { stageful: codeLoader() };
  const defaultPresentation = { stageful: false }

  const editorStateReducer = (state = defaultEdtiorState) => {
    return state;
  }
  const editorStateStore = createStore(editorStateReducer);
  const presentationStateReducer = (oldPresentation = defaultPresentation, action) => {
    const { type, presentation } = action

    if (type !== 'RENDER') {
      return oldPresentation
    }

    const omniValue = {
      klass: 'numberLiteral',
      data: 1
    }

    if (!syntacticGraphsIdentical(presentation, { stageful: omniValue })) {
      throw new Error('Only the omnivalue can be rendered');
    }

    return presentation;
  }

  const presentationStore = createStore(presentationStateReducer);

  new presenter(editorStateStore, presentationStore, syntacticGraphsIdentical);
  renderer.render(presentationStore);
  editorStateStore.dispatch({ type: 'INITIALIZE' })
};

window.addEventListener('load', () => { entry(); });
