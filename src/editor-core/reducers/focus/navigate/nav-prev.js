// @flow
import getChildPresnoRefs from './get-child-presno-refs'
import type { Focus } from '../../../../types/editor-state/focus'
import type { ChildPresnoRef } from '../../../../types/child-presno-ref'
import type { SynoMap } from '../../../../types/syno-map'
import type { Syno } from '../../../../types/syno'
import type { GrammarName } from '../../../../types/editor-state/grammar-name'

export default (
  oldFocusedPresnoRef: ChildPresnoRef,
  synoMap: SynoMap,
  oldParent: (Syno | false),
  oldState: Focus,
  grammarName: GrammarName
): Focus => {
  if (!oldParent) {
    console.warn('ignoring navigation to previous sibling: focus syno is root');
    return oldState;
  }

  if (oldState.charIndex !== false) {
    if (oldState.charIndex === 0) {
      console.warn('ignoring navigation to previous sibling: already on first character');
      return oldState;
    }

    return {
      synoId: oldState.synoId,
      presnoIndex: oldState.presnoIndex,
      charIndex: oldState.charIndex - 1
    };
  }

  const siblingRefz = getChildPresnoRefs(oldParent, synoMap, grammarName);
  if (siblingRefz.length > 0) {
    const oldFocusedPresnoBirthOrder = siblingRefz.findIndex(siblingRef => {
      if (siblingRef.synoRef) {
        // $FlowFixMe (Flow's disjoint union refinement is like that of a little baby)
        return siblingRef.id === oldFocusedPresnoRef.id;
      } else {
        // $FlowFixMe (Flow's disjoint union refinement is like that of a little baby)
        return siblingRef.index === oldFocusedPresnoRef.index;
      }
    });
    if (oldFocusedPresnoBirthOrder === -1) {
      throw new Error("cannot find old focused presno ID among parent's children");
    } else if (oldFocusedPresnoBirthOrder === 0) {
      console.warn('ignoring navigation to previous sibling: already focused on first sibling');
      return oldState;
    } else {
      const newFocusPresnoRef: ChildPresnoRef = siblingRefz[oldFocusedPresnoBirthOrder - 1];

      if (newFocusPresnoRef.synoRef) {
        return {
          synoId: newFocusPresnoRef.id,
          presnoIndex: false,
          charIndex: false
        };
      } else {
        return {
          synoId: oldParent.id,
          presnoIndex: 0,
          charIndex: false
        };
      }
    }
  } else {
    throw new Error('navigate failed; parent has no children!?');
  }
}
