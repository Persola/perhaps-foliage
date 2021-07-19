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
  if (state.inText()) {
    const oldSyno = state.focusedSyno();
    const nameHostRefName: (false | string) = state.grammar()[oldSyno.syntype].textHostRef;

    let oldName: string;
    if (nameHostRefName === false) {
      // $FlowFixMe: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
      oldName = oldSyno.name;
    } else {
      if (!oldSyno[nameHostRefName]) {
        throw new Error(
          'We seem to be focused on a name presno that depends on an incomplete ref.'
          + ' We shouldn\'t have been able to navigate here.',
        );
      }
      // $FlowFixMe: This isn't guaranteed because we don't validate nameHostRef vs. name in grammar
      oldName = state.getSyno(oldSyno[nameHostRefName].id).name;
    }

    const nameLength: number = oldName.length;

    // $FlowFixMe: Flow doesn't look into selector interface
    if (state.focusedCharIndex() > nameLength) {
      console.warn('Ignoring navigation to previous sibling: already on last character');
      return;
    }

    draftFocus.charIndex += 1;
    return;
  }

  if (state.focusedSynoIsRoot() && !state.inPresno()) {
    console.warn('Ignoring navigation to next sibling: focus syno is root');
    return;
  }

  // $FlowFixMe: Flow doesn't look into selector interface
  let oldParent: Syno;
  if (state.inPresno()) {
    oldParent = state.focusedSyno();
  } else {
    // $FlowFixMe: Flow doesn't look into selector interface
    oldParent = state.getSyno(state.focusedSyno().parent.id);
  }

  const siblingRefz = getChildPresnoRefs(oldParent, state);

  if (siblingRefz.length <= 0) {
    throw new Error('navigate failed; parent has no children!?');
  }

  const oldFocusedPresnoBirthOrder = siblingRefz.findIndex(siblingRef => {
    if (siblingRef.synoRef) {
      // $FlowIssue: Flow's disjoint union refinement is like that of a little baby
      return siblingRef.id === state.focusedSynoId();
    }
    // $FlowIssue: Flow's disjoint union refinement is like that of a little baby
    return siblingRef.index === state.focusedPresnoIndex();
  });

  if (oldFocusedPresnoBirthOrder === -1) {
    throw new Error("Cannot find old focused presno ID among parent's children");
  } else if (oldFocusedPresnoBirthOrder >= (siblingRefz.length - 1)) {
    console.warn('Ignoring navigation to next sibling: already focused on last sibling');
  } else {
    const newFocusPresnoRef: ChildPresnoRef = siblingRefz[oldFocusedPresnoBirthOrder + 1];

    if (newFocusPresnoRef.synoRef) {
      draftFocus.synoId = newFocusPresnoRef.id;
      draftFocus.presnoIndex = false;
    } else {
      draftFocus.synoId = oldParent.id;
      draftFocus.presnoIndex = newFocusPresnoRef.index;
    }
  }
};
