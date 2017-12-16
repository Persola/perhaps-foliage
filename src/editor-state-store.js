// @flow
import { createStore } from 'redux';
import codeLoader from './code-loader/code-loader.js'
import type { reduxAction } from './types/redux-action.js'
import type { editorState } from './types/editor-state.js'

const defaultEdtiorstate = { stageful: codeLoader(), result: false };
const naturalReduxStates = ['@@redux/INIT']

const editorstateReducer = (
  originalState: editorState = defaultEdtiorstate,
  action: reduxAction
): editorState => {
  const { type } = action;

  if (type === 'INITIALIZE') {
    return originalState;
  } else if (type === 'UPDATE') {
    const { stageful } = action;

    return Object.assign({}, originalState, {
      stageful
    });
  } else if (type === 'UPDATE_RESULT') {
    const { result } = action;

    return Object.assign({}, originalState, {
      result
    })
  } else if (naturalReduxStates.includes(type)) {
    return originalState;
  } else {
    console.warn(`Unrecognized action type: '${type}'`); // eslint-disable-line no-console
    return originalState;
  }
}

export default createStore(editorstateReducer);
