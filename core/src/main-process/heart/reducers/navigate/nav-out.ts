import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { Warn } from '../../../../types/cross-context/warn';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
  warnUser: Warn,
): void => {
  if (state.inNonSynPresno()) {
    draftFocus.presnoIndex = null;
    draftFocus.budIndex = null;
    return;
  }

  if (state.focusedSynoIsRoot()) {
    warnUser('Ignoring navigation outwards: no parent (focused on root)');
    return;
  }

  draftFocus.synoId = state.focusedSyno().parent.id;
};
