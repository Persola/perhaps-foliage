import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { Warn } from '../../../../types/cross-context/warn';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
  warnUser: Warn,
): void => {
  if (state.inNonSynPresno()) {
    warnUser('Ignoring inward navigation: in non syntactical presno');
    return;
  }

  if (state.focusedSyno().childIds.length === 0) {
    warnUser('Ignoring inward navigation: no children');
  } else {
    draftFocus.synoId = state.focusedSyno().childAt(0).id;
  }
};
