// @flow
import verifyActionType from './util/verify-action-type'
import type { ResultSyntreeRootId } from '../../types/editor-state/result-syntree-root-id'
import type { ReduxAction } from '../../types/redux-action'

export default (oldState: ResultSyntreeRootId, action: ReduxAction): ResultSyntreeRootId => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_SYNO': {
      return oldState;
    }
    case 'END_INTERPRETATION': {
      return action.result.id;
    }
    case 'NAVIGATE': {
      return oldState;
    }
    case 'SET_FOCUS_SYNO': {
      return oldState;
    }
    case 'START_INTERPRETATION': {
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
