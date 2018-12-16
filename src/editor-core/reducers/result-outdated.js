// @flow
import verifyActionType from './verify-action-type'
import type { ResultOutdated } from '../../types/editor-state/result-outdated'
import type { ReduxAction } from '../../types/redux-action'

export default (oldState: ResultOutdated, action: ReduxAction): ResultOutdated => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_NODE': {
      return true;
    }
    case 'END_INTERPRETATION': {
      return false;
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
