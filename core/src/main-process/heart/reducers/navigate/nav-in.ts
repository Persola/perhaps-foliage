import childSynos from '../../../syntactic-interface/read-node/child-synos';

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

  const children = childSynos(state.focusedSyno());
  if (children.length === 0) {
    warnUser('Ignoring inward navigation: no children');
  } else {
    draftFocus.synoId = childSynos(state.focusedSyno())[0].id;
  }
};
