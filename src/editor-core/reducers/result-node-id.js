// @flow
import type { ResultNodeId } from '../../types/editor-state/result-node-id'
import type { ReduxAction } from '../../types/redux-action'

export default (oldState: ResultNodeId, action: ReduxAction): ResultNodeId => {
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
    case '@@INIT': {
      return oldState;
    }
    default: {
      throw new Error(`Unrecognized action type: '${action.type}'`);
    }
  }
}
