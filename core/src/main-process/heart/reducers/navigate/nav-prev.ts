import childSynos from '../../../../syntree-utils/read-node/child-synos';

import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { SynoRef } from '../../../../types/syntactic/syno-ref';
import type { Syno } from '../../../../types/syntactic/syno';
import type { Warn } from '../../../../types/cross-context/warn';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
  warnUser: Warn,
): void => {
  if (state.focusedSynoIsRoot() && !state.inNonSynPresno()) {
    warnUser('Ignoring navigation to previous sibling: focused syno is root');
    return;
  }

  let oldParent: Syno;

  if (state.inNonSynPresno()) {
    oldParent = state.focusedSyno();
  } else {
    oldParent = state.getSyno(state.focusedSyno().parent.id);
  }

  const siblingRefz = childSynos(oldParent);

  const oldBudIndex = state.focus().budIndex;

  if (oldBudIndex !== null) {
    if (oldBudIndex === 0) {
      warnUser('Ignoring navigation to previous sibling: focused bud is first under parent');
      return;
    }

    draftFocus.budIndex = null;
    draftFocus.synoId = siblingRefz[oldBudIndex - 1].id;
    return;
  }

  if (siblingRefz.length <= 0) {
    throw new Error('Navigate failed; parent has no children!?');
  }

  const oldFocusedPresnoBirthOrder = siblingRefz.findIndex((siblingRef, sibIndex) => {
    if (state.synoMap()[siblingRef.id]) {
      return siblingRef.id === state.focusedSynoId();
    }

    throw new Error('presnos should be inaccessible');
    return sibIndex === state.focusedPresnoIndex();
  });

  if (oldFocusedPresnoBirthOrder === -1) {
    throw new Error(
      "Cannot find old focused presno ID among parent's children",
    );
  } else if (oldFocusedPresnoBirthOrder === 0) {
    warnUser('Ignoring navigation to previous sibling: already focused on first sibling');
  } else {
    const newFocusPresnoIndex = oldFocusedPresnoBirthOrder - 1;
    const newFocusPresnoRef: SynoRef = siblingRefz[newFocusPresnoIndex];

    if (state.synoMap()[newFocusPresnoRef.id]) {
      draftFocus.synoId = newFocusPresnoRef.id;
      draftFocus.presnoIndex = null;
    } else {
      throw new Error('presnos should be inaccessible');
      draftFocus.synoId = oldParent.id;
      draftFocus.presnoIndex = newFocusPresnoIndex;
    }
  }
};
