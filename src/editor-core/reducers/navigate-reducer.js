// @flow
import navOut from './navigate/nav-out';
import navIn from './navigate/nav-in';
import navPrev from './navigate/nav-prev';
import navNext from './navigate/nav-next';

import type { MutableEditorState } from '../../types/mutable-editor-state';
import type { Navigate } from '../../types/actions/navigate';
import type { StateSelector } from '../../types/state-selector';

export default (
  state: StateSelector,
  action: Navigate,
  draftState: MutableEditorState,
): void => {
  const { direction } = action;

  switch (direction) {
    case 'out': {
      navOut(state, draftState.focus);
      break;
    }
    case 'in': {
      navIn(state, draftState.focus);
      break;
    }
    case 'prev': {
      navPrev(state, draftState.focus);
      break;
    }
    case 'next': {
      navNext(state, draftState.focus);
      break;
    }
    default: {
      throw new Error('unrecognized navigation direction');
    }
  }
};
