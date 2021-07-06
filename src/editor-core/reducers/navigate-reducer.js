// @flow
import navOut from './navigate/nav-out';
import navIn from './navigate/nav-in';
import navPrev from './navigate/nav-prev';
import navNext from './navigate/nav-next';
import getOldParent from './navigate/get-old-parent';

import type { EditorState } from '../../types/editor-state';
import type { Navigate } from '../../types/actions/navigate';

export default (
  oldState: EditorState,
  action: Navigate,
): EditorState => {
  const { direction, oldFocusedPresnoRef } = action;
  // needs parent and self, or their children ids
  const oldParent = getOldParent(oldFocusedPresnoRef, oldState.synoMap);

  let newFocus;
  switch (direction) {
    case 'out': {
      newFocus = navOut(
        oldState.focus,
        oldState.synoMap,
        oldFocusedPresnoRef,
      );
      break;
    }
    case 'in': {
      newFocus = navIn(
        oldState.focus,
        oldState.grammarName,
        oldState.synoMap,
        oldFocusedPresnoRef,
      );
      break;
    }
    case 'prev': {
      newFocus = navPrev(
        oldState.focus,
        oldState.grammarName,
        oldState.synoMap,
        oldFocusedPresnoRef,
        oldParent,
      );
      break;
    }
    case 'next': {
      newFocus = navNext(
        oldState.focus,
        oldState.grammarName,
        oldState.synoMap,
        oldFocusedPresnoRef,
        oldParent,
      );
      break;
    }
    default: {
      throw new Error('unrecognized navigation direction');
    }
  }

  // $FlowIssue: poorly typed ECMA built-in (Object.assign)
  return {
    ...oldState,
    focus: newFocus,
  };
};
