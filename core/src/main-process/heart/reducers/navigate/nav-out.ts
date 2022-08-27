import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { Warn } from '../../../../types/cross-context/warn';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
  warnUser: Warn,
): void => {
  if (state.inText()) {
    draftFocus.charIndex = null;
    return;
  }

  if (state.inPresno()) {
    draftFocus.presnoIndex = null;
    return;
  }

  if (state.focusedSynoIsRoot()) {
    warnUser('Ignoring navigation outwards: no parent (focused on root)');
    return;
  }

  draftFocus.synoId = state.focusedSyno().parent.id;
};
