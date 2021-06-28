// @flow
import verifyActionType from './util/verify-action-type';
import type { ReduxAction } from '../../types/redux-action';

export default (
  oldState: boolean,
  action: ReduxAction,
): boolean => {
  switch (action.type) {
    case 'START_INTERPRETATION': {
      if (oldState !== false) {
        throw new Error('attempted to interpret while already interpreting');
      }

      return true;
    }
    case 'REPLACE_FOCUSED_SYNO': {
      return oldState;
    }
    case 'END_INTERPRETATION': {
      if (oldState !== true) {
        throw new Error('attempted to stop interpreting while not interpreting');
      }

      return false;
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
};
