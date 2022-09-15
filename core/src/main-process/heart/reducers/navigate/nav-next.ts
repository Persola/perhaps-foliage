import StateMutator from '../../../state-interface/state-mutator';

import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { Warn } from '../../../../types/cross-context/warn';

export default (
  state: StateMutator,
  draftFocus: MutableFocus,
  warnUser: Warn,
): void => {
  if (state.focusedSyno().isRoot() && !state.inNonSynPresno()) {
    warnUser('Ignoring navigation to next sibling: focused syno is root');
    return;
  }

  if (typeof state.focus().budIndex === 'number') {
    if (state.focus().budIndex === state.focusedSyno().childIds.length) {
      warnUser('Ignoring navigation to next sibling: focused bud last among siblings');
      return;
    }

    state.focus().synoId = state.focusedSyno().childAt(state.focus().budIndex).id;
    state.focus().budIndex = null;
    return;
  }

  if (state.inNonSynPresno()) {
    throw new Error('unimplemented: nav in non syn presno');
  }

  if (state.focusedSyno().index() === state.focusedSyno().parent().childIds.length - 1) {
    warnUser('Ignoring navigation to next sibling: already focused on last sibling');
    return;
  }

  draftFocus.synoId = state.focusedSyno().parent().childIds[state.focusedSyno().index() + 1];
};
