// @flow
import verifyActionType from './util/verify-action-type'
import type { ReduxAction } from '../../types/redux-action'
import type { InverseReferenceMap } from '../../types/editor-state/inverse-reference-map'
import type { SynoMap } from '../../types/syno-map'

export default (
  oldState: InverseReferenceMap,
  action: ReduxAction,
  synoMap: SynoMap
): InverseReferenceMap => {
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
