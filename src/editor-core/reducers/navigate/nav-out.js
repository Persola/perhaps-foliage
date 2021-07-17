// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { MutableFocus } from '../../../types/editor-state/mutable/mutable-focus';

export default (
  state: StateSelector,
  draftState: MutableFocus,
): void => {
  if (state.inText()) {
    draftState.charIndex = false;
    return;
  }
  if (state.inPresno()) {
    draftState.presnoIndex = false;
    return;
  }

  // $FlowFixMe: Flow doesn't look into selector interface
  if (state.focusedSyno().parent === false) {
    console.warn('Ignoring navigation outwards: no parent (tree root)');
    return;
  }
  // $FlowFixMe: Flow doesn't look into selector interface
  draftState.synoId = state.focusedSyno().parent.id;
};
