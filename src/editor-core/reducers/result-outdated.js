// @flow
import type { ResultOutdated } from '../../types/editor-state/result-outdated'
import type { ReduxAction } from '../../types/redux-action'

export default (oldState: ResultOutdated, action: ReduxAction): ResultOutdated => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_NODE': {
      return true;
    }
    case 'UPDATE_RESULT': {
      return false;
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
