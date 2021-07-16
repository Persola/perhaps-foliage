// @flow
import getChildPresnoRefs from './get-child-presno-refs';

import type { StateSelector } from '../../../types/state-selector';
import type { MutableFocus } from '../../../types/editor-state/mutable/mutable-focus';
import type { ChildPresnoRef } from '../../../types/child-presno-ref';
import type { Syno } from '../../../types/syno';

export default (
  state: StateSelector,
  draftState: MutableFocus,
  oldFocusedPresnoRef: ChildPresnoRef,
  oldParent: (Syno | false),
): void => {
  if (!oldParent) {
    console.warn('ignoring navigation to previous sibling: focus syno is root');
    return;
  }

  if (state.inText()) {
    if (state.focusedCharIndex() === 0) {
      console.warn('Ignoring navigation to previous sibling: already on first character');
      return;
    }

    // $FlowFixMe: Flow doesn't look into selector interface
    draftState.charIndex -= 1;
    return;
  }

  const siblingRefz = getChildPresnoRefs(oldParent, state);
  if (siblingRefz.length <= 0) {
    throw new Error('Navigate failed; parent has no children!?');
  } else {
    const oldFocusedPresnoBirthOrder = siblingRefz.findIndex(siblingRef => {
      if (siblingRef.synoRef) {
        // $FlowIssue: Flow's disjoint union refinement is like that of a little baby
        return siblingRef.id === oldFocusedPresnoRef.id;
      }
      // $FlowIssue: Flow's disjoint union refinement is like that of a little baby
      return siblingRef.index === oldFocusedPresnoRef.index;
    });
    if (oldFocusedPresnoBirthOrder === -1) {
      throw new Error("Cannot find old focused presno ID among parent's children");
    } else if (oldFocusedPresnoBirthOrder === 0) {
      console.warn('Ignoring navigation to previous sibling: already focused on first sibling');
    } else {
      const newFocusPresnoRef: ChildPresnoRef = siblingRefz[oldFocusedPresnoBirthOrder - 1];

      if (newFocusPresnoRef.synoRef) {
        draftState.synoId = newFocusPresnoRef.id;
        draftState.presnoIndex = false;
        return;
      }

      draftState.synoId = oldParent.id;
      draftState.presnoIndex = 0;
    }
  }
};
