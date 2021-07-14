// @flow
import getChildPresnoRefs from './get-child-presno-refs';

import type { StateSelector } from '../../../types/state-selector';
import type { MutableFocus } from '../../../types/editor-state/mutable/mutable-focus';
import type { ChildPresnoRef } from '../../../types/child-presno-ref';

export default (
  state: StateSelector,
  draftState: MutableFocus,
): void => {
  if (state.inText()) {
    console.warn('cannot navigate down: editing text');
    return;
  }

  if (state.inPresno()) {
    draftState.charIndex = 0; // enter beginning of name
    return;
  }

  const childPresnoRefs = getChildPresnoRefs(
    state.focusedSyno(),
    state.synoMap(),
    state.grammarName(),
  );

  if (childPresnoRefs.length === 0) {
    console.warn('ignoring navigation inwards: no children');
    return;
  }
  const newFocusPresnoRef: ChildPresnoRef = childPresnoRefs[0];

  if (newFocusPresnoRef.synoRef) {
    draftState.synoId = newFocusPresnoRef.id;
    return;
  }

  draftState.presnoIndex = 0;
};
