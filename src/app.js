// @flow
import { createStore } from 'redux';
import Mousetrap from 'mousetrap';
import codeLoader from './code-loader.js'
import presenter from './presenter.js'
import renderer from './renderer.jsx'

require('./stylesheet.css');

const entry = () => {
  if (document.readyState !== 'complete') { throw (new Error('readyState error')); }
  const defaultEdtiorState = { stageful: codeLoader() };
  const defaultPresentation = { stageful: false }

  const editorStateReducer = (state = defaultEdtiorState, action) => {
    const { type, value } = action

    if (type === 'UPDATE') {
      if (![0, 1].includes(value)) {
        throw new Error('UPDATE value may only be 0 or 1')
      }

      return Object.assign({}, state, {
        stageful: Object.assign({}, state.stageful, {
          data: value
        })
      })
    } else {
      return state;
    }

  }
  const editorStateStore = createStore(editorStateReducer);
  const presentationStateReducer = (oldPresentation = defaultPresentation, action) => {
    const { type, presentation } = action

    if (type !== 'RENDER') {
      return oldPresentation
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

  new presenter(editorStateStore, presentationStore);
  renderer.render(presentationStore);
  editorStateStore.dispatch({ type: 'INITIALIZE' })
  Mousetrap.bind('0', () => {
    editorStateStore.dispatch({ type: 'UPDATE', value: 0 })
  });
  Mousetrap.bind('1', () => {
    editorStateStore.dispatch({ type: 'UPDATE', value: 1 })
  });
};

window.addEventListener('load', () => { entry(); });
