import navOut from './navigate/nav-out';
import navIn from './navigate/nav-in';
import navPrev from './navigate/nav-prev';
import navNext from './navigate/nav-next';

import type { StateSelector } from '../../../types/state-selector';
import type { Navigate } from '../../../types/actions/navigate';
import type { MutableEditorState } from '../../../types/mutable-editor-state';
import type { Warn } from '../../../types/cross-context/warn';
import type { MutableFocus } from '../../../types/editor-state/mutable/mutable-focus';

export default (
  state: StateSelector,
  action: Navigate,
  draftState: MutableEditorState,
  warnUser: Warn,
): void => {
  if (state.integrationLoaded() === false) {
    warnUser('Ignoring NAVIGATE action: no integration loaded');
    return;
  }

  if (state.treeLoaded() === false) {
    warnUser('Ignoring NAVIGATE action: no tree loaded');
    return;
  }

  const focus: MutableFocus = draftState.focus;
  const { direction } = action;

  switch (direction) {
    case 'out': {
      navOut(state, focus, warnUser);
      break;
    }

    case 'in': {
      navIn(state, focus, warnUser);
      break;
    }

    case 'prev': {
      navPrev(state, focus, warnUser);
      break;
    }

    case 'next': {
      navNext(state, focus, warnUser);
      break;
    }

    default: {
      throw new Error('unrecognized navigation direction');
    }
  }
};
