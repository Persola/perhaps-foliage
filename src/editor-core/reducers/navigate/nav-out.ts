import type { StateSelector } from '../../../types/state-selector';
import type { MutableFocus } from '../../../types/editor-state/mutable/mutable-focus';

export default (state: StateSelector, draftFocus: MutableFocus): void => {
  if (state.inText()) {
    draftFocus.charIndex = null;
    return;
  }

  if (state.inPresno()) {
    draftFocus.presnoIndex = null;
    return;
  }

  if (!state.focusedSyno().parent) {
    console.warn('Ignoring navigation outwards: no parent (tree root)');
    return;
  }

  // $FlowFixMe: Flow doesn't look into selector interface
  draftFocus.synoId = state.focusedSyno().parent.id;
};
