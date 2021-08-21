import getChildPresnoRefs from './get-child-presno-refs';
import nextChar from './next/char';

import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { ChildPresnoRef } from '../../../../types/child-presno-ref';
import type { Syno } from '../../../../types/syntactic/syno';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
): void => {
  if (state.inText()) {
    nextChar(state, draftFocus);
    return;
  }

  if (state.focusedSynoIsRoot() && !state.inPresno()) {
    console.warn('Ignoring navigation to next sibling: focus syno is root');
    return;
  }

  let oldParent: Syno;

  if (state.inPresno()) {
    oldParent = state.focusedSyno();
  } else {
    oldParent = state.getSyno(state.focusedSyno().parent.id);
  }

  const siblingRefz = getChildPresnoRefs(oldParent, state);

  if (siblingRefz.length <= 0) {
    throw new Error('navigate failed; parent has no children!?');
  }

  const oldFocusedPresnoBirthOrder = siblingRefz.findIndex(siblingRef => {
    if (siblingRef.synoRef === true) {
      return siblingRef.id === state.focusedSynoId();
    }

    return siblingRef.index === state.focusedPresnoIndex();
  });

  if (oldFocusedPresnoBirthOrder === -1) {
    throw new Error(
      "Cannot find old focused presno ID among parent's children",
    );
  } else if (oldFocusedPresnoBirthOrder >= siblingRefz.length - 1) {
    console.warn(
      'Ignoring navigation to next sibling: already focused on last sibling',
    );
  } else {
    const newFocusPresnoRef: ChildPresnoRef = siblingRefz[oldFocusedPresnoBirthOrder + 1];

    if (newFocusPresnoRef.synoRef === true) {
      draftFocus.synoId = newFocusPresnoRef.id;
      draftFocus.presnoIndex = null;
    } else {
      draftFocus.synoId = oldParent.id;
      draftFocus.presnoIndex = newFocusPresnoRef.index;
    }
  }
};
