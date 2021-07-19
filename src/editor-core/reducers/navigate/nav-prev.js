// @flow
import getChildPresnoRefs from './get-child-presno-refs';

import type { StateSelector } from '../../../types/state-selector';
import type { MutableFocus } from '../../../types/editor-state/mutable/mutable-focus';
import type { ChildPresnoRef } from '../../../types/child-presno-ref';
import type { Syno } from '../../../types/syno';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
): void => {
  if (state.focusedSynoIsRoot()) {
    console.warn('ignoring navigation to previous sibling: focus syno is root');
    return;
  }

  if (state.inText()) {
    if (state.focusedCharIndex() === 0) {
      console.warn('Ignoring navigation to previous sibling: already on first character');
      return;
    }

    // $FlowFixMe: Flow doesn't look into selector interface
    draftFocus.charIndex -= 1;
    return;
  }

  let oldParent: Syno;
  if (state.inPresno()) {
    oldParent = state.focusedSyno();
  } else {
    // $FlowFixMe: Flow doesn't look into selector interface
    oldParent = state.getSyno(state.focusedSyno().parent.id);
  }

  const siblingRefz = getChildPresnoRefs(oldParent, state);

  if (siblingRefz.length <= 0) {
    throw new Error('Navigate failed; parent has no children!?');
  }

  const oldFocusedSynoBirthOrder = siblingRefz.findIndex(siblingRef => {
    if (siblingRef.synoRef) {
      // $FlowIssue: Flow's disjoint union refinement is like that of a little baby
      return siblingRef.id === state.focusedSynoId();
    }
    // $FlowIssue: Flow's disjoint union refinement is like that of a little baby
    return siblingRef.index === state.focusedPresnoIndex();
  });

  if (oldFocusedSynoBirthOrder === -1) {
    throw new Error("Cannot find old focused presno ID among parent's children");
  } else if (oldFocusedSynoBirthOrder === 0) {
    console.warn('Ignoring navigation to previous sibling: already focused on first sibling');
  } else {
    const newFocusPresnoRef: ChildPresnoRef = siblingRefz[oldFocusedSynoBirthOrder - 1];

    if (newFocusPresnoRef.synoRef) {
      draftFocus.synoId = newFocusPresnoRef.id;
      draftFocus.presnoIndex = false;
    } else {
      draftFocus.synoId = oldParent.id;
      draftFocus.presnoIndex = newFocusPresnoRef.index;
    }
  }
};
