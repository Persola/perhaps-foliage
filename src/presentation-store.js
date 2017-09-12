// @flow
import { createStore } from 'redux';
import validPresentation from './valid-presentation.js'
import type { reduxAction } from './types/redux-action.js'

type state = Object

const defaultPresentation = { stageful: false }

const presentationStateReducer = (oldPresentation = defaultPresentation, action: reduxAction) => {
  const { type, presentation } = action

  if (type !== 'RENDER') {
    if (type === '@@redux/INIT') {
      return oldPresentation
    } else {
      throw new Error('Invalid presentation reducer action type')
    }
  }

  if (!validPresentation(presentation)) {
    throw new Error('Only the omnivalue can be rendered');
  }

  return presentation;
}

export default createStore(presentationStateReducer);
