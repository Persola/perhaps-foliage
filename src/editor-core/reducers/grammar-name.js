// @flow
import verifyActionType from './util/verify-action-type'
import type { ReduxAction } from '../../types/redux-action'
import type { GrammarName } from '../../types/editor-state/grammar-name'

export default (
  oldState: GrammarName,
  action: ReduxAction
): GrammarName => {
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
