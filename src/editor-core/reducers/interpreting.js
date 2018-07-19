// @flow
import type { ReduxAction } from '../../types/redux-action'

export default (oldState: boolean, action: ReduxAction): boolean => {
  switch (action.type) {
    case 'START_INTERPRETATION': {
      if (oldState !== false) {
        throw new Error('attempted to interpret while already interpreting')
      }

      return true;
    }
    case 'REPLACE_FOCUSED_NODE': {
      return oldState;
    }
    case 'END_INTERPRETATION': {
      if (oldState !== true) {
        throw new Error('attempted to stop interpreting while not interpreting')
      }

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
