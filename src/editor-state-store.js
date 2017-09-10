import { createStore } from 'redux';
import codeLoader from './code-loader.js'

const defaultEdtiorState = { stageful: codeLoader() };

const editorStateReducer = (state = defaultEdtiorState, action) => {
  const { type } = action

  if (type === 'UPDATE') {
    const { value } = action

    if (![0, 1].includes(value)) {
      throw new Error('UPDATE value may only be 0 or 1')
    }

    return Object.assign({}, state, {
      stageful: Object.assign({}, state.stageful, {
        data: value
      })
    })
  } else if (type === 'UPDATE_RESULT') {
    return Object.assign({}, state, {
      result: action.result
    })
  } else {
    return state;
  }
}

export default createStore(editorStateReducer);
