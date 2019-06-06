// @flow
import getChildPresnoRefs from './get-child-presno-refs'
import type { Focus } from '../../../../types/editor-state/focus'
import type { ChildPresnoRef } from '../../../../types/child-presno-ref'
import type { SynoMap } from '../../../../types/syno-map'
import type { Syno } from '../../../../types/syno'

export default (
  oldFocusedPresnoRef: ChildPresnoRef,
  synoMap: SynoMap,
  oldParent: (Syno | false)
): Focus => {
  if (!oldParent) { throw new Error('navigate failed; no parent!'); }
  const siblingRefz = getChildPresnoRefs(oldParent, synoMap);
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
      throw new Error('no previous sibling');
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
