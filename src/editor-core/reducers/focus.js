// @flow
import navOut from './focus/navigate/nav-out';
import navIn from './focus/navigate/nav-in';
import navPrev from './focus/navigate/nav-prev';
import navNext from './focus/navigate/nav-next';
import verifyActionType from './util/verify-action-type';
import NorPrimitiveId from '../../extension-staging-area/saliva/nor-primitive-id.js';

import type { Focus } from '../../types/editor-state/focus';
import type { Syno } from '../../types/syno';
import type { SynoMap } from '../../types/syno-map';
import type { ReduxAction } from '../../types/redux-action';
import type { GrammarName } from '../../types/editor-state/grammar-name';

const getOldParent = (oldFocusedPresnoRef, synoMap) => {
  let oldParent: (Syno | false);
  if (oldFocusedPresnoRef.synoRef) {
    const oldFocusedPresno = synoMap[oldFocusedPresnoRef.id];
    oldParent = oldFocusedPresno.parent && synoMap[oldFocusedPresno.parent.id];
  } else {
    oldParent = synoMap[oldFocusedPresnoRef.parent.id];
  }
  return oldParent;
};

export default (
  oldState: Focus,
  action: ReduxAction,
  synoMap: SynoMap,
  grammarName: GrammarName,
): Focus => {
  switch (action.type) {
    case 'REPLACE_FOCUSED_SYNO': {
      return {
        synoId: action.newSynoId,
        presnoIndex: false,
        charIndex: false,
      };
    }
    case 'END_INTERPRETATION': {
      return oldState;
    }
    case 'NAVIGATE': {
      const { direction, oldFocusedPresnoRef } = action;
      // needs parent and self, or their children ids
      const oldParent = getOldParent(oldFocusedPresnoRef, synoMap);

      switch (direction) { // NAVIGATE
        case 'out': {
          return navOut(oldFocusedPresnoRef, synoMap, oldState);
        }
        case 'in': {
          return navIn(oldFocusedPresnoRef, synoMap, oldState, grammarName);
        }
        case 'prev': {
          return navPrev(oldFocusedPresnoRef, synoMap, oldParent, oldState, grammarName);
        }
        case 'next': {
          return navNext(oldFocusedPresnoRef, synoMap, oldParent, oldState, grammarName);
        }
        default: {
          throw new Error('unrecognized navigation direction');
        }
      }
    }
    case 'DESTROY_FOCUSED_SYNO': {
      const { oldFocusedPresnoRef } = action;
      // needs parent and self, or their children ids

      if (action.oldFocusedPresnoRef.synoRef !== true) {
        throw new TypeError('DESTROY_FOCUSED_SYNO action recieved while not focused on syno level');
      }

      const oldFocusedPresno = synoMap[action.oldFocusedPresnoRef.id];
      if (
        oldFocusedPresno.parent === false
        || oldFocusedPresno.id === NorPrimitiveId || (
          oldFocusedPresno.parent
          && oldFocusedPresno.parent.id === NorPrimitiveId
        )
      ) {
        console.warn("ignoring syno detruction: can't destroy NOR primitive or children");
        return oldState;
      }
      return navOut(oldFocusedPresnoRef, synoMap, oldState);
    }
    case 'SET_FOCUS_SYNO': {
      const { synoId } = action;
      return {
        synoId,
        presnoIndex: false,
        charIndex: false,
      };
    }
    case 'START_INTERPRETATION': {
      return oldState;
    }
    case 'CHAR_BACKSPACE': {
      if (oldState.charIndex === false) {
        throw new TypeError('CHAR_BACKSPACE action recieved while not focused on text syno');
      }

      if (oldState.charIndex === 0) {
        return oldState;
      }

      return {
        ...oldState,
        charIndex: oldState.charIndex - 1,
      };
    }
    default: {
      verifyActionType(action.type);
      return oldState;
    }
  }
};
