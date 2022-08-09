import getChildPresnoRefs from './get-child-presno-refs';

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

  const siblingRefz = getChildPresnoRefs(oldParent, state, integration);

  if (siblingRefz.length <= 0) {
    throw new Error('Navigate failed; parent has no children!?');
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
  } else if (oldFocusedPresnoBirthOrder === 0) {
    warnUser('Ignoring navigation to previous sibling: already focused on first sibling');
  } else {
    const newFocusPresnoIndex = oldFocusedPresnoBirthOrder - 1;
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
