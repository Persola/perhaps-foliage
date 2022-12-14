import getChildPresnoRefs from './get-child-presno-refs';
import nextChar from './next/char';

import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { PresnoRef } from '../../../../types/presenter/presno-ref';
import type { Syno } from '../../../../types/syntactic/syno';
import type { Warn } from '../../../../types/cross-context/warn';
import type { MainsideLangInt } from '../../../../types/language-integration/interfaces/mainside/mainside-lang-int';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
  warnUser: Warn,
  integration: MainsideLangInt,
): void => {
  if (state.inText()) {
    nextChar(state, draftFocus, warnUser);
    return;
  }

  if (state.focusedSynoIsRoot() && !state.inPresno()) {
    warnUser('Ignoring navigation to next sibling: focus syno is root');
    return;
  }

  let oldParent: Syno;

  if (state.inPresno()) {
    oldParent = state.focusedSyno();
  } else {
    oldParent = state.getSyno(state.focusedSyno().parent.id);
  }

  const siblingRefz = getChildPresnoRefs(oldParent, state, integration);

  if (siblingRefz.length <= 0) {
    throw new Error('navigate failed; parent has no children!?');
  }

  const oldFocusedPresnoBirthOrder = siblingRefz.findIndex((siblingRef, sibIndex) => {
    if (state.synoMap()[siblingRef.id]) {
      return siblingRef.id === state.focusedSynoId();
    }

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
    const newFocusPresnoRef: PresnoRef = siblingRefz[newFocusPresnoIndex];

    if (state.synoMap()[newFocusPresnoRef.id]) {
      draftFocus.synoId = newFocusPresnoRef.id;
      draftFocus.presnoIndex = null;
    } else {
      draftFocus.synoId = oldParent.id;
      draftFocus.presnoIndex = newFocusPresnoIndex;
    }
  }
};
