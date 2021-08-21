import getChildPresnoRefs from './get-child-presno-refs';

import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { ChildPresnoRef } from '../../../../types/child-presno-ref';
import type { Warn } from '../../../../types/cross-context/warn';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
  warnUser: Warn,
): void => {
  if (state.inText()) {
    warnUser('cannot navigate down: editing text');
    return;
  }

  if (state.inPresno()) {
    draftFocus.charIndex = 0; // enter beginning of name

    return;
  }

  const childPresnoRefs = getChildPresnoRefs(state.focusedSyno(), state);

  if (childPresnoRefs.length === 0) {
    warnUser('ignoring navigation inwards: no children');
    return;
  }

  const newFocusPresnoRef: ChildPresnoRef = childPresnoRefs[0];

  if (newFocusPresnoRef.synoRef === true) {
    draftFocus.synoId = newFocusPresnoRef.id;
    return;
  }

  draftFocus.presnoIndex = 0;
};
