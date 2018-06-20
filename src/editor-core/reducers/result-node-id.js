// @flow
import type { resultNodeId } from '../../types/editor-state/result-node-id'
import type { reduxAction } from '../../types/redux-action'

export default (oldState: resultNodeId, action: reduxAction): resultNodeId => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_NODE': {
      return oldState;
    }
    case 'UPDATE_RESULT': {
      return action.result.id;
    }
    case 'NAVIGATE': {
      return oldState;
    }
    case 'SET_FOCUS_SYNO': {
      return oldState;
    }
    case '@@redux/INIT': {
      return oldState;
    }
    default: {
      throw new Error(`Unrecognized action type: '${action.type}'`);
    }
  }
}
