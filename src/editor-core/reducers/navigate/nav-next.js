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
  if (state.focusedSynoIsRoot()) {
    console.warn('Ignoring navigation to next sibling: focus syno is root');
    return;
  }

  if (state.inText()) {
    const oldSyno = state.focusedSyno();
    let oldName: string;
    if (oldSyno.syntype === 'argument') {
      if (oldSyno.parameter === false) {
        throw new TypeError(
          'Tried to navigate inside shouldn\'t-exist name of argument lacking parameter (flow)',
        );
      }
      const oldParameter = state.getSyno(oldSyno.parameter.id);
      if (oldParameter.syntype !== 'functionParameter') {
        throw new Error('Wrong syntype from synomap (flow)');
      }
      oldName = oldParameter.name;
    } else {
      if (
        oldSyno.syntype !== 'functionParameter'
        && oldSyno.syntype !== 'functionDefinition'
      ) {
        throw new Error('Wrong syntype from synomap');
      }
      oldName = oldSyno.name;
    }
    const nameLength: number = oldName.length;

    // $FlowFixMe: Flow doesn't look into selector interface
    if (state.focusedCharIndex() > nameLength) {
      console.warn('Ignoring navigation to previous sibling: already on last character');
      return;
    }

    draftState.charIndex += 1;
    return;
  }

  // $FlowFixMe: Flow doesn't look into selector interface
  const siblingRefz = getChildPresnoRefs(oldParent, state);
  if (siblingRefz.length <= 0) {
    throw new Error('navigate failed; parent has no children!?');
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
    } else if (oldFocusedPresnoBirthOrder >= (siblingRefz.length - 1)) {
      console.warn('Ignoring navigation to previous sibling: already focused on last sibling');
    } else {
      const newFocusPresnoRef: ChildPresnoRef = siblingRefz[oldFocusedPresnoBirthOrder + 1];

      if (newFocusPresnoRef.synoRef) {
        draftState.synoId = newFocusPresnoRef.id;
        draftState.presnoIndex = false;
        return;
      }

      // $FlowFixMe: Flow doesn't look into selector interface
      draftState.synoId = oldParent.id;
      draftState.presnoIndex = 0;
    }
  }
};
