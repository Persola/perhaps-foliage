import getChildPresnoRefs from './get-child-presno-refs';

import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { ChildPresnoRef } from '../../../../types/child-presno-ref';
import type { Syno } from '../../../../types/syntactic/syno';
import type { Warn } from '../../../../types/cross-context/warn';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
  warnUser: Warn,
): void => {
  if (state.focusedSynoIsRoot()) {
    warnUser('ignoring navigation to previous sibling: focus syno is root');
    return;
  }

  if (state.inText()) {
    if (state.focusedCharIndex() === 0) {
      warnUser('Ignoring navigation to previous sibling: already on first character');
      return;
    }

    draftFocus.charIndex -= 1;
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
    throw new Error('Navigate failed; parent has no children!?');
  }

  const oldFocusedSynoBirthOrder = siblingRefz.findIndex(siblingRef => {
    if (siblingRef.synoRef === true) {
      return siblingRef.id === state.focusedSynoId();
    }

    return siblingRef.index === state.focusedPresnoIndex();
  });

  if (oldFocusedSynoBirthOrder === -1) {
    throw new Error(
      "Cannot find old focused presno ID among parent's children",
    );
  } else if (oldFocusedSynoBirthOrder === 0) {
    warnUser('Ignoring navigation to previous sibling: already focused on first sibling');
  } else {
    const newFocusPresnoRef: ChildPresnoRef = siblingRefz[oldFocusedSynoBirthOrder - 1];

    if (newFocusPresnoRef.synoRef === true) {
      draftFocus.synoId = newFocusPresnoRef.id;
      draftFocus.presnoIndex = null;
    } else {
      draftFocus.synoId = oldParent.id;
      draftFocus.presnoIndex = newFocusPresnoRef.index;
    }
  }
};
