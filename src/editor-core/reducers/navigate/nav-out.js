// @flow
import type { StateSelector } from '../../../types/state-selector';
import type { MutableFocus } from '../../../types/editor-state/mutable/mutable-focus';
import type { ChildPresnoRef } from '../../../types/child-presno-ref';

export default (
  state: StateSelector,
  draftState: MutableFocus,
  oldFocusedPresnoRef: ChildPresnoRef,
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
  const oldFocusedPresno = state.getSyno(oldFocusedPresnoRef.id);
  if (oldFocusedPresno.parent === false) {
    console.warn('Ignoring navigation outwards: no parent');
    return;
  }
  draftState.synoId = oldFocusedPresno.parent.id;
};
