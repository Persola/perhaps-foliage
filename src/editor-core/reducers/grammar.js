// @flow
import verifyActionType from './util/verify-action-type'
import type { ReduxAction } from '../../types/redux-action'
import type { Grammar } from '../../types/editor-state/grammar'

export default (
  oldState: Grammar,
  action: ReduxAction
): Grammar => {
  switch (action.type) {
    case 'START_INTERPRETATION': {
      return oldState;
    }
    case 'REPLACE_FOCUSED_SYNO': {
      return oldState;
    }
    case 'END_INTERPRETATION': {
      return oldState;
    }
    case 'NAVIGATE': {
      return oldState;
    }
    case 'SET_FOCUS_SYNO': {
      return oldState;
    }
    case 'CHAR_BACKSPACE': {
      return oldState;
    }
    case 'DESTROY_FOCUSED_SYNO': {
      return oldState;
    }
    default: {
      verifyActionType(action.type);
      return oldState;
    }
  }
}
