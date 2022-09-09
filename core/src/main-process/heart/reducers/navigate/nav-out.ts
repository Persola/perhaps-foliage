import StateMutator from '../../../mutators/state-mutator';

import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { Warn } from '../../../../types/cross-context/warn';

export default (
  state: StateMutator,
  draftFocus: MutableFocus,
  warnUser: Warn,
): void => {
  if (state.inNonSynPresno()) {
    draftFocus.presnoIndex = null;
    draftFocus.budIndex = null;
    return;
  }

  if (state.focusedSyno().isRoot()) {
    warnUser('Ignoring outwards navigation: focused on root');
    return;
  }

  draftFocus.synoId = state.focusedSyno().parent().id;
};
