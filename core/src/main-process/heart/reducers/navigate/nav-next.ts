import childSynos from '../../../../syntree-utils/read-node/child-synos';

import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { SynoRef } from '../../../../types/syntactic/syno-ref';
import type { Syno } from '../../../../types/syntactic/syno';
import type { Warn } from '../../../../types/cross-context/warn';
import type { MainsideLangInt } from '../../../../types/language-integration/interfaces/mainside/mainside-lang-int';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
  warnUser: Warn,
  integration: MainsideLangInt,
): void => {
  if (state.focusedSynoIsRoot() && !state.inNonSynPresno()) {
    warnUser('Ignoring navigation to next sibling: focused syno is root');
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
    if (oldBudIndex === siblingRefz.length) {
      warnUser('Ignoring navigation to next sibling: focused bud is last under parent');
      return;
    }

    draftFocus.budIndex = null;
    draftFocus.synoId = siblingRefz[oldBudIndex].id;
    return;
  }

  if (siblingRefz.length <= 0) {
    throw new Error('navigate failed; parent has no children!?');
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
  } else if (oldFocusedPresnoBirthOrder >= siblingRefz.length - 1) {
    warnUser('Ignoring navigation to next sibling: already focused on last sibling');
  } else {
    const newFocusPresnoIndex = oldFocusedPresnoBirthOrder + 1;
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
