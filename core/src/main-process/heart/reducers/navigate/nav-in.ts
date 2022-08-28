import getChildPresnoRefs from './get-child-presno-refs';

import type { StateSelector } from '../../../../types/state-selector';
import type { MutableFocus } from '../../../../types/editor-state/mutable/mutable-focus';
import type { PresnoRef } from '../../../../types/presenter/presno-ref';
import type { Warn } from '../../../../types/cross-context/warn';
import type { MainsideLangInt } from '../../../../types/language-integration/interfaces/mainside/mainside-lang-int';

export default (
  state: StateSelector,
  draftFocus: MutableFocus,
  warnUser: Warn,
  integration: MainsideLangInt,
): void => {
  if (state.inNonSynPresno()) { // assume any non-syn presno is a text presno
    draftFocus.charIndex = 0; // enter beginning of name

    return;
  }

  const childPresnoRefs = getChildPresnoRefs(state.focusedSyno(), state, integration);

  if (childPresnoRefs.length === 0) {
    warnUser('Ignoring navigation inwards: no children');
    return;
  }

  const newFocusPresnoRef: PresnoRef = childPresnoRefs[0];

  if (state.synoMap()[newFocusPresnoRef.id]) {
    draftFocus.synoId = newFocusPresnoRef.id;
    return;
  }

  draftFocus.presnoIndex = 0;
};
