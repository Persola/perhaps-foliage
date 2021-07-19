// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { MutableFocus } from '../../../types/editor-state/mutable/mutable-focus';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
): void => {
  if (state.inText()) {
    draftFocus.charIndex = false;
    return;
  }
  if (state.inPresno()) {
    draftFocus.presnoIndex = false;
    return;
  }

  // $FlowFixMe: Flow doesn't look into selector interface
  if (state.focusedSyno().parent === false) {
    console.warn('Ignoring navigation outwards: no parent (tree root)');
    return;
  }
  // $FlowFixMe: Flow doesn't look into selector interface
  draftFocus.synoId = state.focusedSyno().parent.id;
};
