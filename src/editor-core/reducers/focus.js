// @flow
import navOut from './focus/navigate/nav-out'
import navIn from './focus/navigate/nav-in'
import navPrev from './focus/navigate/nav-prev'
import navNext from './focus/navigate/nav-next'
import verifyActionType from './util/verify-action-type'
import type { Focus } from '../../types/editor-state/focus'
import type { Syno } from '../../types/syno'
import type { ChildPresnoRef } from '../../types/child-presno-ref'
import type { SynoMap } from '../../types/syno-map'
import type { ReduxAction } from '../../types/redux-action'

export default (
  oldState: Focus,
  action: ReduxAction,
  synoMap: SynoMap
): Focus => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_SYNO': {
      return {
        synoId: action.newSynoId,
        presnoIndex: false,
        charIndex: false
      };
    }
    case 'END_INTERPRETATION': {
      return oldState;
    }
    case 'NAVIGATE': {
      // needs parent and self, or their children ids
      const { direction, oldFocusedPresnoRef } = action;

      let oldParent: (Syno | false);
      if (oldFocusedPresnoRef.synoRef) {
        const oldFocusedPresno = synoMap[oldFocusedPresnoRef.id];
        oldParent = oldFocusedPresno.parent && synoMap[oldFocusedPresno.parent.id];
      } else {
        oldParent = synoMap[oldFocusedPresnoRef.parent.id];
      }

      switch (direction) {
        case 'out': {
          return navOut(oldFocusedPresnoRef, synoMap, oldState);
        }
        case 'in': {
          return navIn(oldFocusedPresnoRef, synoMap, oldState);
        }
        case 'prev': {
          return navPrev(oldFocusedPresnoRef, synoMap, oldParent, oldState);
        }
        case 'next': {
          return navNext(oldFocusedPresnoRef, synoMap, oldParent, oldState);
        }
        default: {
          throw new Error('unrecognized navigation direction');
        }
      }
    }
    case 'SET_FOCUS_SYNO': {
      const { synoId } = action;
      return {
        synoId: synoId,
        presnoIndex: false,
        charIndex: false
      };
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
