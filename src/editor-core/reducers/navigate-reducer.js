// @flow
import navOut from './navigate/nav-out';
import navIn from './navigate/nav-in';
import navPrev from './navigate/nav-prev';
import navNext from './navigate/nav-next';
import getOldParent from './navigate/get-old-parent';

import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { Navigate } from '../../types/actions/navigate';
import type { StateSelector } from '../../types/state-selector';

export default (
  state: StateSelector,
  action: Navigate,
  draftState: MutableEditorState,
): void => {
  const { direction, oldFocusedPresnoRef } = action;
  // needs parent and self, or their children ids
  const oldParent = getOldParent(oldFocusedPresnoRef, state.synoMap());

  switch (direction) {
    case 'out': {
      navOut(
        state,
        draftState.focus,
        oldFocusedPresnoRef,
      );
      break;
    }
    case 'in': {
      navIn(
        state,
        draftState.focus,
      );
      break;
    }
    case 'prev': {
      navPrev(
        state,
        draftState.focus,
        oldFocusedPresnoRef,
        oldParent,
      );
      break;
    }
    case 'next': {
      navNext(
        state,
        draftState.focus,
        oldFocusedPresnoRef,
        oldParent,
      );
      break;
    }
    default: {
      throw new Error('unrecognized navigation direction');
    }
  }
};
