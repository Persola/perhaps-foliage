import StateMutator from '../../../mutators/state-mutator';

import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { Warn } from '../../../../types/cross-context/warn';

export default (
  state: StateMutator,
  draftFocus: MutableFocus,
  warnUser: Warn,
): void => {
  if (state.focusedSyno().isRoot() && !state.inNonSynPresno()) {
    warnUser('Ignoring navigation to previous sibling: focused syno is root');
    return;
  }

  if (state.inNonSynPresno()) {
    throw new Error('unimplemented: nav in non syn presno');
  }

  if (state.focusedSyno().index() === 0) {
    warnUser('Ignoring navigation to next sibling: already focused on first sibling');
    return;
  }

  draftFocus.synoId = state.focusedSyno().parent().childIds[state.focusedSyno().index() - 1];
};
