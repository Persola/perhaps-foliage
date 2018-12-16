// @flow
import verifyActionType from './verify-action-type'
import type { ResultSyntreeRootId } from '../../types/editor-state/result-syntree-root-id'
import type { ReduxAction } from '../../types/redux-action'

export default (oldState: ResultSyntreeRootId, action: ReduxAction): ResultSyntreeRootId => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_NODE': {
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
    default: {
      verifyActionType(action.type);
      return oldState;
    }
  }
}
